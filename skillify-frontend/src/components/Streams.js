import React from 'react';
import { Link } from 'react-router-dom';

const STREAMS = [
  { key:'science', name:'Science', color:'#3b82f6', subjects:['Physics','Chemistry','Biology/CS','Mathematics'], careers:['Researcher','Data Scientist','Doctor','Engineer (via foundation)'], blurb:'Analytical thinking leading to research, medicine and technology.' },
  { key:'commerce', name:'Commerce', color:'#f59e0b', subjects:['Accountancy','Business Studies','Economics','Mathematics'], careers:['CA/CS/CMA','Business Analyst','Investment Banking','Entrepreneurship'], blurb:'Business, finance, management and the global economy.' },
  { key:'arts', name:'Arts', color:'#8b5cf6', subjects:['History','Political Science','Psychology','Languages/Media'], careers:['Civil Services','Designer','Psychologist','Journalist/Media'], blurb:'Creativity, communication and social understanding.' },
  { key:'engineering', name:'Engineering', color:'#ef4444', subjects:['Mathematics','Physics','Programming','Mechanics/Electronics'], careers:['Software Engineer','Core Engineer','Product Developer'], blurb:'Apply science and math to build technology and infrastructure.' }
];

function Streams() {
  return (
    <div>
      <h1 className="page-title">Explore Streams</h1>
      <p className="subtitle">A quick overview of each stream with typical subjects and careers.</p>

      <div className="grid">
        {STREAMS.map(s => (
          <div key={s.key} className="card">
            <div className="header">
              <h2 style={{ color:s.color }}>{s.name}</h2>
              <span className="chip" style={{ background:s.color }}>{s.name}</span>
            </div>
            <p className="blurb">{s.blurb}</p>
            <div className="row">
              <div>
                <h4>Key Subjects</h4>
                <ul>{s.subjects.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h4>Typical Careers</h4>
                <ul>{s.careers.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
            <div className="cta-row">
              <Link className="button" to={`/institutes?type=${s.key}`}>See {s.name} Colleges →</Link>
              <Link className="button ghost" to="/exams">View Exams</Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .page-title{ color:#0f172a; margin:0 0 8px; font-size:30px; font-weight:800; }
        .subtitle{ color:#475569; margin:0 0 16px; }
        .grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:16px; }
        .card{ background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:18px; box-shadow:0 10px 24px rgba(0,0,0,.06); }
        .header{ display:flex; align-items:center; justify-content:space-between; }
        .blurb{ color:#334155; margin:8px 0 12px; }
        h4{ margin:10px 0 6px; color:#0f172a; }
        ul{ margin:0; padding-left:18px; color:#475569; }
        .row{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
        .chip{ color:#fff; font-weight:800; border-radius:999px; padding:4px 10px; font-size:12px; }
        .button{ background:#2563eb; color:#fff; padding:10px 14px; border-radius:10px; text-decoration:none; font-weight:700; display:inline-block; }
        .button.ghost{ background:#fff; color:#374151; border:2px solid #d1d5db; }
        .cta-row{ display:flex; gap:10px; flex-wrap:wrap; }
        @media (max-width:700px){ .row{ grid-template-columns:1fr; } }
      `}</style>
    </div>
  );
}

export default Streams;
