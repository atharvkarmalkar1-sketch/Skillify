import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Institutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [scope, setScope] = useState('india'); // india | maharashtra
  const [favorites, setFavorites] = useLocalStorage('fav_institutes', []);
  const [compareIds, setCompareIds] = useState([]);

  // Pick up initial filter from query param (?type=engineering|science|commerce|arts)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('type');
    if (t) setFilter(t);
  }, []);

  useEffect(() => {
    api.get('/api/institutes')
      .then(data => { setInstitutes(data); setLoading(false); })
      .catch(err => { setError(err.message || 'Failed to load institutes'); setLoading(false); });
  }, []);

  const normalized = (s) => (s || '').toString().toLowerCase();
  const isFav = (id) => favorites.includes(id);
  const toggleFav = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const toggleCompare = (id) => {
    setCompareIds(prev => prev.includes(id)
      ? prev.filter(x=>x!==id)
      : (prev.length < 2 ? [...prev, id] : prev)
    );
  };

  const visible = useMemo(() => {
    let list = [...institutes];
    if (scope === 'maharashtra') {
      list = list.filter(inst => normalized(inst.address).includes('maharashtra'));
    }
    if (filter !== 'all') {
      list = list.filter(inst => normalized(inst.type) === normalized(filter));
    }
    if (search.trim()) {
      const q = normalized(search);
      list = list.filter(inst => normalized(inst.name).includes(q) || normalized(inst.address).includes(q));
    }
    if (sort === 'name-asc') list.sort((a,b)=>a.name.localeCompare(b.name));
    if (sort === 'name-desc') list.sort((a,b)=>b.name.localeCompare(a.name));
    if (sort === 'type-asc') list.sort((a,b)=>a.type.localeCompare(b.type));
    if (sort === 'type-desc') list.sort((a,b)=>b.type.localeCompare(a.type));
    return list;
  }, [institutes, filter, search, sort, scope]);

  const favList = institutes.filter(i => favorites.includes(i.id));
  const compareList = institutes.filter(i => compareIds.includes(i.id));

  if (loading) return <Centered>Loading institutes...</Centered>;
  if (error) return <Centered>Error: {error}</Centered>;

  return (
    <div>
      <h1 className="page-title">Institutes</h1>

      <div className="toolbar wrap">
        <div className="group">
          <label>Scope</label>
          <select value={scope} onChange={(e)=>setScope(e.target.value)}>
            <option value="india">All India</option>
            <option value="maharashtra">Maharashtra only</option>
          </select>
        </div>
        <div className="group">
          <label>Stream</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="engineering">Engineering</option>
            <option value="science">Science</option>
            <option value="commerce">Commerce</option>
            <option value="arts">Arts</option>
          </select>
        </div>
        <div className="group grow">
          <label>Search</label>
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by name or address" />
        </div>
        <div className="group">
          <label>Sort</label>
          <select value={sort} onChange={(e)=>setSort(e.target.value)}>
            <option value="name-asc">Name A→Z</option>
            <option value="name-desc">Name Z→A</option>
            <option value="type-asc">Type A→Z</option>
            <option value="type-desc">Type Z→A</option>
          </select>
        </div>
      </div>

      {favList.length > 0 && (
        <div className="favorites">
          <div className="fav-head">
            <h3>Favorites</h3>
            <button className="chip clear" onClick={()=>setFavorites([])}>Clear</button>
          </div>
          <div className="fav-grid">
            {favList.map(f => (
              <div key={f.id} className="fav-card">
                <div className="fav-title">{f.name}</div>
                <div className="fav-meta">{f.type} • {f.address}</div>
                <div className="fav-actions">
                  <a className="button sm" href={f.website} target="_blank" rel="noreferrer">Website</a>
                  <button className="button ghost sm" onClick={()=>toggleFav(f.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-grid">
        {visible.map(inst => (
          <div key={inst.id} className="card">
            <div className="card-header">
              <h3 title={inst.name}>{inst.name}</h3>
              <span className={`tag tag-${normalized(inst.type)}`}>{inst.type}</span>
            </div>
            <p className="muted"><strong>Address:</strong> {inst.address}</p>
            <div className="row-actions">
              <a className="button button-outline" href={inst.website} target="_blank" rel="noopener noreferrer">Visit Website →</a>
              <button className={`chip ${isFav(inst.id) ? 'active' : ''}`} onClick={()=>toggleFav(inst.id)}>{isFav(inst.id) ? '★ Favorited' : '☆ Favorite'}</button>
              <label className="chip">
                <input type="checkbox" checked={compareIds.includes(inst.id)} onChange={()=>toggleCompare(inst.id)} /> Compare
              </label>
            </div>
          </div>
        ))}
      </div>

      {compareList.length > 0 && (
        <div className="compare">
          <div className="cmp-head">
            <h3>Compare ({compareList.length}/2)</h3>
            <button className="chip clear" onClick={()=>setCompareIds([])}>Clear</button>
          </div>
          <div className="cmp-grid">
            {compareList.map(c => (
              <div key={c.id} className="cmp-card">
                <div className="cmp-title">{c.name}</div>
                <div className="cmp-row"><strong>Type:</strong> {c.type}</div>
                <div className="cmp-row"><strong>Address:</strong> {c.address}</div>
                <div className="cmp-row"><strong>Avg Placements:</strong> {c.placementsAvg || '—'}</div>
                <div className="cmp-row"><strong>Campus Area:</strong> {c.campusArea || '—'}</div>
                <div className="cmp-row"><strong>Top Recruiters:</strong> {(c.topRecruiters && c.topRecruiters.join(', ')) || '—'}</div>
                <div className="cmp-row"><strong>Exams Accepted:</strong> {(c.examsAccepted && c.examsAccepted.join(', ')) || '—'}</div>
                <div className="cmp-row"><strong>Cutoff:</strong> {c.cutoffNote || '—'}</div>
                <div className="cmp-row"><a className="button sm" href={c.website} target="_blank" rel="noreferrer">Website</a></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visible.length === 0 && (
        <Centered>No institutes found.</Centered>
      )}

      <style>{`
        .page-title { color:#0f172a; margin:0 0 1rem; font-size:30px; font-weight:800; }
        .toolbar { display:flex; gap:12px; align-items:flex-end; margin: 12px 0 24px; }
        .toolbar.wrap { flex-wrap: wrap; }
        .group { display:flex; flex-direction:column; gap:6px; }
        .group.grow { flex:1; min-width: 220px; }
        .group label { font-weight:700; color:#334155; font-size:12px; text-transform:uppercase; letter-spacing:.04em; }
        .group select, .group input { padding:10px 12px; border:1px solid #e5e7eb; border-radius:10px; background:#fff; outline:none; }
        .group input::placeholder { color:#9ca3af; }

        .favorites { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px; box-shadow: 0 10px 24px rgba(0,0,0,0.06); margin-bottom:16px; }
        .fav-head { display:flex; justify-content:space-between; align-items:center; }
        .fav-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:10px; margin-top:10px; }
        .fav-card { border:1px solid #e5e7eb; border-radius:12px; padding:12px; background:#f8fafc; }
        .fav-title { font-weight:800; color:#0f172a; }
        .fav-meta { color:#64748b; font-size:12px; margin:6px 0; }
        .fav-actions { display:flex; gap:8px; }

        .card-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:16px; }
        .card { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:18px; box-shadow: 0 10px 24px rgba(0,0,0,0.06); transition: transform .15s ease, box-shadow .15s ease; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,0.08); }
        .card-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .card-header h3 { margin:0; color:#0f172a; font-size:18px; line-height:1.3; font-weight:800; }
        .muted { color:#6b7280; margin:10px 0 16px; }
        .row-actions { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
        .button { display:inline-block; padding:10px 14px; border-radius:10px; text-decoration:none; font-weight:700; }
        .button-outline { color:#2563eb; border:2px solid #2563eb; }
        .button-outline:hover { background:#2563eb; color:#fff; }
        .button.sm { padding:8px 10px; font-size:12px; }
        .chip { padding:6px 10px; border-radius:999px; font-size:12px; border:1px solid #e5e7eb; background:#fff; cursor:pointer; }
        .chip.active { background:#fde68a; border-color:#f59e0b; }
        .chip.clear { background:#fee2e2; border-color:#ef4444; color:#991b1b; }

        .compare { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:14px; box-shadow: 0 10px 24px rgba(0,0,0,0.06); margin-top:16px; }
        .cmp-head { display:flex; justify-content:space-between; align-items:center; }
        .cmp-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:10px; margin-top:10px; }
        .cmp-card { border:1px solid #e5e7eb; border-radius:12px; padding:12px; background:#fff; }
        .cmp-title { font-weight:800; color:#0f172a; margin-bottom:6px; }
        .cmp-row { color:#334155; font-size:14px; margin:4px 0; }

        .tag { padding:5px 10px; border-radius:999px; font-size:12px; font-weight:800; color:#fff; }
        .tag-engineering { background:#ef4444; }
        .tag-science { background:#3b82f6; }
        .tag-commerce { background:#f59e0b; }
        .tag-arts { background:#8b5cf6; }
      `}</style>
    </div>
  );
}

function Centered({ children }) {
  return (
    <div style={{ textAlign:'center', padding:'3rem', color:'#6b7280' }}>{children}</div>
  );
}

export default Institutes; 