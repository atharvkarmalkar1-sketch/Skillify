import React, { useMemo } from 'react';
import { EXAMS_UG, EXAMS_UPDATED } from '../data/exams';

const EXAM_DETAILS = [
  { stream:'Engineering', name:'JEE Main', colleges:['NITs', 'IIITs', 'GFTIs'], link:'https://jeemain.nta.ac.in/', window:'Jan / Apr (typical)' },
  { stream:'Engineering', name:'JEE Advanced', colleges:['IITs (Mumbai, Delhi, Madras, Kanpur...)'], link:'https://jeeadv.ac.in/', window:'May / Jun (typical)' },
  { stream:'Engineering', name:'BITSAT', colleges:['BITS Pilani/Goa/Hyderabad'], link:'https://www.bitsadmission.com/', window:'May / Jun (typical)' },
  { stream:'Engineering', name:'VITEE', colleges:['VIT (Vellore/Chennai/Amaravati/Bhopal)'], link:'https://viteee.vit.ac.in/', window:'Apr (typical)' },

  { stream:'Science', name:'CUET (UG)', colleges:['Central Universities (B.Sc., etc.)'], link:'https://cuet.samarth.ac.in/', window:'May / Jun (typical)' },
  { stream:'Science', name:'NEET (UG)', colleges:['AIIMS', 'JIPMER', 'Govt/Private Medical Colleges'], link:'https://neet.nta.nic.in/', window:'May / Jun (typical)' },
  { stream:'Science', name:'IISER IAT', colleges:['IISERs (Pune, Kolkata, Mohali...)'], link:'https://iiseradmission.in/', window:'May / Jun (typical)' },

  { stream:'Commerce', name:'CUET (UG)', colleges:['Central Universities (B.Com/BMS/BA Eco)'], link:'https://cuet.samarth.ac.in/', window:'May / Jun (typical)' },
  { stream:'Commerce', name:'IPMAT', colleges:['IIM Indore/Rohtak (IPM)'], link:'https://www.iimidr.ac.in/academic-programmes/five-year-integrated-programme-in-management-ipm/', window:'May / Jun (typical)' },
  { stream:'Commerce', name:'CA Foundation', colleges:['Professional pathway (ICAI)'], link:'https://www.icai.org/', window:'Jun / Dec (typical)' },

  { stream:'Arts/Design', name:'CUET (UG)', colleges:['Central Universities (BA programs)'], link:'https://cuet.samarth.ac.in/', window:'May / Jun (typical)' },
  { stream:'Arts/Design', name:'NID DAT', colleges:['National Institute of Design'], link:'https://admissions.nid.edu/', window:'Dec / Jan (typical)' },
  { stream:'Arts/Design', name:'NIFT Entrance', colleges:['NIFT campuses'], link:'https://nift.ac.in/', window:'Feb (typical)' },
  { stream:'Arts/Design', name:'UCEED', colleges:['IITB/IITG/IITD/IITDM Jabalpur (Design)'], link:'https://www.uceed.iitb.ac.in/', window:'Jan (typical)' }
];

function Exams() {
  const groups = useMemo(() => {
    const g = new Map();
    EXAM_DETAILS.forEach(d => {
      if (!g.has(d.stream)) g.set(d.stream, []);
      g.get(d.stream).push(d);
    });
    return Array.from(g.entries());
  }, []);

  return (
    <div>
      <h1 className="page-title">Entrance Exams (UG, India)</h1>
      <p className="subtitle">Tentitive windows and official links. Updated {EXAMS_UPDATED}. Always verify dates on official sites.</p>

      {groups.map(([stream, list]) => (
        <div key={stream} className="stream-card">
          <div className="stream-head">
            <span className="badge">{stream}</span>
          </div>
          <div className="exam-grid">
            {list.map(ex => (
              <a key={ex.name} className="exam-card" href={ex.link} target="_blank" rel="noreferrer">
                <div className="ex-title">{ex.name}</div>
                <div className="ex-window">{ex.window}</div>
                <div className="ex-colleges">{ex.colleges.join(', ')}</div>
              </a>
            ))}
          </div>
        </div>
      ))}

      <h2 className="section-title">National Timeline</h2>
      <div className="timeline">
        <div className="tl-grid">
          {EXAMS_UG.map(ex => (
            <a key={ex.key} className="tl-card" href={ex.link} target="_blank" rel="noreferrer">
              <div className="tl-title">{ex.name}</div>
              <div className="tl-window">{ex.window}</div>
              <div className="tl-link">Official Site →</div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .page-title{ color:#0f172a; margin:0 0 8px; font-size:30px; font-weight:800; }
        .subtitle{ color:#475569; margin:0 0 16px; }
        .section-title{ color:#0f172a; margin:18px 0 10px; font-size:22px; font-weight:800; }
        .stream-card{ background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:16px; box-shadow:0 10px 24px rgba(0,0,0,.06); margin: 0 0 16px; }
        .stream-head{ display:flex; align-items:center; justify-content:flex-start; margin-bottom:10px; }
        .badge{ background:#111827; color:#fff; font-weight:800; border-radius:999px; padding:6px 12px; font-size:12px; }
        .exam-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px; }
        .exam-card{ display:block; padding:12px; border:1px solid #e5e7eb; border-radius:12px; text-decoration:none; color:#0f172a; background:#f8fafc; }
        .exam-card:hover{ background:#eef2ff; border-color:#c7d2fe; }
        .ex-title{ font-weight:800; margin-bottom:4px; }
        .ex-window{ color:#475569; font-size:12px; margin-bottom:6px; }
        .ex-colleges{ color:#334155; font-size:12px; }

        .timeline{ background:#fff; border:1px solid #e5e7eb; border-radius:16px; padding:18px; box-shadow:0 10px 24px rgba(0,0,0,.06); }
        .tl-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:12px; }
        .tl-card{ display:block; padding:14px; border:1px solid #e5e7eb; border-radius:12px; text-decoration:none; color:#0f172a; background:#f8fafc; }
        .tl-card:hover{ background:#eef2ff; border-color:#c7d2fe; }
        .tl-title{ font-weight:800; margin-bottom:4px; }
        .tl-window{ color:#475569; font-size:12px; margin-bottom:6px; }
        .tl-link{ color:#2563eb; font-weight:700; font-size:12px; }
      `}</style>
    </div>
  );
}

export default Exams;
