import React, { useEffect, useState } from 'react';
import { api } from '../api';

function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/api/scholarships')
      .then(data => { setScholarships(data); setLoading(false); })
      .catch(err => { setError(err.message || 'Failed to load scholarships'); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? scholarships : scholarships.filter(s => s.stream.toLowerCase() === filter.toLowerCase());

  if (loading) return <Centered>Loading scholarships...</Centered>;
  if (error) return <Centered>Error: {error}</Centered>;

  return (
    <div>
      <h1 className="page-title">Scholarships & Financial Aid</h1>

      <div className="toolbar">
        <label>Filter by stream</label>
        <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="engineering">Engineering</option>
          <option value="science">Science</option>
          <option value="commerce">Commerce</option>
          <option value="arts">Arts</option>
        </select>
      </div>

      <div className="card-grid">
        {filtered.map(s => (
          <div key={s.id} className="card">
            <div className="card-header">
              <h3>{s.name}</h3>
              <span className="chip">{s.stream}</span>
            </div>
            <p className="muted"><strong>Amount:</strong> {s.amount}</p>
            <p className="muted"><strong>Eligibility:</strong> {s.eligibility}</p>
            <div className="row">
              <span className="deadline">⏰ Deadline: {s.deadline}</span>
              <a className="button" href="#">Apply Now</a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <Centered>No scholarships found.</Centered>}

      <style>{`
        .page-title { color:#111; margin:0 0 1rem; font-size:28px; }
        .toolbar { display:flex; gap:12px; align-items:center; margin: 12px 0 24px; }
        .toolbar label { font-weight:600; color:#333; }
        .toolbar select { padding:8px 10px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; }
        .card-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:16px; }
        .card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:18px; box-shadow: 0 6px 18px rgba(0,0,0,0.05); transition: transform .15s ease, box-shadow .15s ease; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.08); }
        .card-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .card-header h3 { margin:0; color:#111827; font-size:18px; line-height:1.3; }
        .muted { color:#6b7280; margin:8px 0; }
        .row { display:flex; justify-content:space-between; align-items:center; margin-top:10px; }
        .deadline { color:#ef4444; font-weight:600; }
        .button { background:#2563eb; color:#fff; padding:10px 14px; border-radius:8px; text-decoration:none; font-weight:600; }
        .chip { background:#111827; color:#fff; font-weight:700; border-radius:999px; padding:4px 10px; font-size:12px; }
      `}</style>
    </div>
  );
}

function Centered({ children }) { return <div style={{ textAlign:'center', padding:'3rem', color:'#6b7280' }}>{children}</div>; }

export default Scholarships; 