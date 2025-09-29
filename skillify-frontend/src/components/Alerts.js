import React from 'react';
import { EXAMS_UG } from '../data/exams';

const EXAM_INFO = {
  'JEE Main': 'Qualifies for NITs, IIITs, many state/central institutes; prerequisite for JEE Advanced (IITs).',
  'JEE Advanced': 'Admission to IITs (Mumbai, Delhi, Madras, Kanpur, etc.).',
  'NEET (UG)': 'Admission to MBBS/BDS/AYUSH at AIIMS, JIPMER, and other medical colleges.',
  'BITSAT': 'BITS Pilani, BITS Goa, BITS Hyderabad.',
  'VITEEE': 'VIT Vellore, Chennai, Bhopal, Amaravati campuses.',
  'CUET (UG)': 'Central universities and many participating institutions for B.Sc./BA/B.Com/BMS, etc.',
  'NIFT Entrance': 'NIFT campuses across India.',
  'NID DAT': 'National Institute of Design campuses.',
  'UCEED': 'IIT design programs (IITB/IITG/IITD/IITDM Jabalpur).',
  'IPMAT': 'IIM Indore and IIM Rohtak five-year Integrated Programme in Management.'
};

function Alerts() {
  return (
    <div>
      <h1 className="page-title">Upcoming Exams</h1>
      <p className="subtitle">Tentitive timelines and what you can get through each exam. Always confirm on official sites.</p>

      <div className="list">
        {EXAMS_UG.map(ex => (
          <div key={ex.key} className="item">
            <div className="row">
              <div className="left">
                <div className="name"><a href={ex.link} target="_blank" rel="noreferrer">{ex.name}</a></div>
                <div className="window">{ex.window}</div>
              </div>
              <div className="right">
                <div className="info">{EXAM_INFO[ex.name] || 'See official website for participating colleges.'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .page-title{ color:#0f172a; margin:0 0 8px; font-size:30px; font-weight:800; }
        .subtitle{ color:#475569; margin:0 0 16px; }
        .list{ display:grid; gap:10px; }
        .item{ background:#fff; border:1px solid #e5e7eb; border-radius:14px; padding:14px; box-shadow:0 10px 24px rgba(0,0,0,.06); }
        .row{ display:flex; justify-content:space-between; gap:12px; align-items:flex-start; flex-wrap:wrap; }
        .name{ font-weight:800; color:#0f172a; }
        .window{ color:#475569; font-size:12px; }
        .info{ color:#334155; max-width:680px; }
        .left a{ color:#2563eb; text-decoration:none; }
      `}</style>
    </div>
  );
}

export default Alerts; 