import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { EXAMS_UG } from '../data/exams';

function Home() {
  const slides = useMemo(() => ([
    {
      id: 1,
      title: 'Discover Your Best-Fit Stream',
      subtitle: 'Take a quick, smart quiz and get a personalized recommendation.',
      ctaText: 'Take the Quiz',
      ctaTo: '/quiz',
      bg: 'linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%)',
      accent: '#2563eb'
    },
    {
      id: 2,
      title: 'Explore Top Institutes in Maharashtra & India',
      subtitle: 'Browse curated colleges across Engineering, Science, Commerce and Arts.',
      ctaText: 'View Institutes',
      ctaTo: '/institutes',
      bg: 'linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%)',
      accent: '#f59e0b'
    },
    {
      id: 3,
      title: 'Entrance Exams Timeline (UG, India)',
      subtitle: 'See tentitive windows for JEE, NEET, CUET, Design & more, stream-wise.',
      ctaText: 'View Exam Timeline',
      ctaTo: '/exams',
      bg: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
      accent: '#16a34a'
    }
  ]), []);

  const [index, setIndex] = useState(0);
  const [institutes, setInstitutes] = useState([]);
  const [favorites] = useLocalStorage('fav_institutes', []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    api.get('/api/institutes').then(setInstitutes).catch(()=>{});
  }, []);

  const favList = useMemo(() => {
    if (!favorites?.length) return [];
    return institutes.filter(i => favorites.includes(i.id)).slice(0, 6);
  }, [favorites, institutes]);

  const active = slides[index];

  return (
    <div>
      <section className="hero" style={{ background: active.bg }}>
        <button className="nav-btn left" onClick={() => setIndex((i)=> (i - 1 + slides.length) % slides.length)} aria-label="Previous">‹</button>
        <button className="nav-btn right" onClick={() => setIndex((i)=> (i + 1) % slides.length)} aria-label="Next">›</button>

        <div className="hero-inner">
          <h1 style={{ color: '#0f172a' }}>{active.title}</h1>
          <p className="subtitle">{active.subtitle}</p>
          <Link to={active.ctaTo} className="hero-cta" style={{ borderColor: active.accent, color: '#fff', background: active.accent }}>
            {active.ctaText}
          </Link>

          <div className="dots">
            {slides.map((s, i) => (
              <button
                key={s.id}
                className={`dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <FeatureCard
          color="#2563eb"
          title="Career Quiz"
          text="Answer a few questions and get a clear, data-backed stream suggestion."
          to="/quiz"
          cta="Start Quiz"
        />
        <FeatureCard
          color="#f59e0b"
          title="Institutes"
          text="Browse detailed info on top colleges across India & Maharashtra."
          to="/institutes"
          cta="Explore"
        />
        <FeatureCard
          color="#16a34a"
          title="Exam Timeline"
          text="Find tentitive windows & official links for major exams by stream."
          to="/exams"
          cta="See Exams"
        />
      </section>

      <section className="next-steps">
        <h2>Next steps for students</h2>
        <ol>
          <li>Take the Career Quiz and note your recommended stream</li>
          <li>Check upcoming Exams and mark important dates</li>
          <li>Shortlist colleges: set Scope to All India and use Compare</li>
          <li>Save favorites and revisit them from this dashboard</li>
        </ol>
        <div className="cta-row">
          <Link className="button" to="/quiz">Start Quiz</Link>
          <Link className="button ghost" to="/exams">View Exams</Link>
          <Link className="button ghost" to="/institutes">Browse Institutes</Link>
        </div>
      </section>

      <section className="exams-preview">
        <h2>This month’s exams (preview)</h2>
        <div className="preview-grid">
          {EXAMS_UG.slice(0,4).map(ex => (
            <a key={ex.key} className="preview-card" href={ex.link} target="_blank" rel="noreferrer">
              <div className="pv-title">{ex.name}</div>
              <div className="pv-window">{ex.window}</div>
              <div className="pv-link">Official Site →</div>
            </a>
          ))}
        </div>
      </section>

      <section className="favorites">
        <h2>Your favorites</h2>
        {!favList.length && (
          <p className="muted">No favorites yet. Add some from the Institutes page.</p>
        )}
        {!!favList.length && (
          <div className="fav-grid">
            {favList.map(f => (
              <div key={f.id} className="fav-card">
                <div className="fav-title">{f.name}</div>
                <div className="fav-meta">{f.type} • {f.address}</div>
                <div className="fav-actions">
                  <a className="button sm" href={f.website} target="_blank" rel="noreferrer">Website</a>
                  <Link className="button ghost sm" to={`/institutes?type=${f.type.toLowerCase()}`}>Similar</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .hero { position:relative; border-radius:16px; padding:48px 16px; overflow:hidden; box-shadow: 0 10px 24px rgba(0,0,0,.08); }
        .hero-inner { max-width: 960px; margin: 0 auto; text-align:center; }
        .hero h1 { font-size: 34px; line-height:1.2; margin: 0 0 10px; }
        .subtitle { color:#334155; font-size: 18px; margin: 0 0 20px; }
        .hero-cta { display:inline-block; padding: 12px 16px; border-radius: 10px; font-weight: 700; text-decoration:none; border:2px solid transparent; }
        .nav-btn { position:absolute; top:50%; transform: translateY(-50%); background: rgba(255,255,255,.8); border:0; width:40px; height:40px; border-radius:999px; font-size:22px; cursor:pointer; box-shadow:0 6px 18px rgba(0,0,0,.08); }
        .nav-btn.left { left:12px; }
        .nav-btn.right { right:12px; }
        .dots { display:flex; gap:8px; justify-content:center; margin-top:14px; }
        .dot { width:10px; height:10px; border-radius:999px; border:0; background:#cbd5e1; cursor:pointer; }
        .dot.active { background:#0f172a; }

        .features { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; margin: 26px 0; }
        .card { background:#fff; border:1px solid #e5e7eb; border-radius:14px; padding:18px; box-shadow: 0 10px 24px rgba(0,0,0,.05); }
        .card h3 { margin:0 0 8px; color:#0f172a; }
        .card p { margin:0 0 14px; color:#475569; }
        .card .link { display:inline-block; font-weight:700; text-decoration:none; padding:10px 12px; border-radius:8px; color:#fff; }

        .next-steps { background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:18px; box-shadow:0 10px 24px rgba(0,0,0,.06); margin: 16px 0; }
        .next-steps h2 { margin:0 0 8px; color:#0f172a; }
        .next-steps ol { margin:8px 0 12px 20px; color:#475569; }
        .cta-row { display:flex; gap:10px; flex-wrap:wrap; }
        .button { background:#2563eb; color:#fff; padding:10px 14px; border-radius:10px; text-decoration:none; font-weight:700; display:inline-block; }
        .button.ghost { background:#fff; color:#374151; border:2px solid #d1d5db; }
        .button.sm { padding:8px 10px; font-size:12px; }

        .exams-preview h2 { color:#0f172a; margin:16px 0 8px; }
        .preview-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px; }
        .preview-card { display:block; padding:12px; border:1px solid #e5e7eb; border-radius:12px; text-decoration:none; color:#0f172a; background:#f8fafc; }
        .preview-card:hover { background:#eef2ff; border-color:#c7d2fe; }
        .pv-title { font-weight:800; margin-bottom:4px; }
        .pv-window { color:#475569; font-size:12px; margin-bottom:6px; }
        .pv-link { color:#2563eb; font-weight:700; font-size:12px; }

        .favorites h2 { color:#0f172a; margin:16px 0 8px; }
        .fav-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px; }
        .fav-card { border:1px solid #e5e7eb; border-radius:12px; padding:12px; background:#fff; }
        .fav-title { font-weight:800; color:#0f172a; }
        .fav-meta { color:#64748b; font-size:12px; margin:6px 0; }
        .fav-actions { display:flex; gap:8px; }
      `}</style>
    </div>
  );
}

function FeatureCard({ color, title, text, to, cta }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{text}</p>
      <Link className="link" to={to} style={{ background: color }}>{cta}</Link>
    </div>
  );
}

export default Home; 