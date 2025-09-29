import React, { useEffect, useState, useMemo } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get('/api/quiz')
      .then(data => { setQuestions(data); setAnswers(new Array(data.length).fill('')); setLoading(false); })
      .catch(err => { setError(err.message || 'Failed to load quiz'); setLoading(false); });
  }, []);

  const submit = () => {
    api.post('/api/quiz/submit', { answers })
      .then(data => setResult(data))
      .catch(err => setError(err.message || 'Failed to submit quiz'));
  };

  const streamToTag = (name) => {
    const map = { Engineering:'engineering', Science:'science', Commerce:'commerce', Arts:'arts' };
    return map[name] || 'all';
  };

  const progress = useMemo(() => {
    const answered = answers.filter(Boolean).length;
    return questions.length ? Math.round((answered / questions.length) * 100) : 0;
  }, [answers, questions.length]);

  if (loading) return <Centered>Loading quiz...</Centered>;
  if (error) return <Centered>Error: {error}</Centered>;
  if (!questions.length) return <Centered>No questions available.</Centered>;

  if (result) {
    const top = result.recommended || 'Science';
    return (
      <div>
        <div className="result">
          <h2>Your Recommended Stream</h2>
          <div className="stream">{top}</div>
          {result.ranking && (
            <div className="ranking">
              {result.ranking.map(r => (
                <div key={r.stream} className="rank-row">
                  <span>{r.stream}</span>
                  <div className="bar"><div style={{ width: `${(r.score / questions.length) * 100}%` }} /></div>
                  <span className="score">{r.score}</span>
                </div>
              ))}
            </div>
          )}
          <div className="cta-row">
            <Link className="button" to={`/institutes?type=${encodeURIComponent(streamToTag(top))}`}>See Colleges for {top}</Link>
            <button className="button ghost" onClick={() => { setResult(null); setCurrent(0); setAnswers(new Array(questions.length).fill('')); }}>Retake Quiz</button>
          </div>
        </div>
        <style>{`
          .result { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:24px; box-shadow:0 10px 24px rgba(0,0,0,.06); max-width:720px; margin:0 auto; }
          .result h2 { margin:0 0 12px; color:#111; }
          .stream { font-size:28px; font-weight:800; color:#2563eb; margin-bottom:16px; }
          .ranking { display:grid; gap:10px; margin:12px 0 16px; }
          .rank-row { display:grid; grid-template-columns: 120px 1fr 40px; gap:10px; align-items:center; }
          .bar { height:10px; background:#e5e7eb; border-radius:999px; overflow:hidden; }
          .bar > div { height:100%; background:#2563eb; }
          .score { text-align:right; color:#374151; font-weight:700; }
          .button { background:#2563eb; color:#fff; padding:10px 14px; border-radius:8px; text-decoration:none; font-weight:600; border:0; }
          .button.ghost { background:#fff; color:#374151; border:2px solid #d1d5db; }
          .cta-row { display:flex; gap:12px; margin-top:12px; }
        `}</style>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz">
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="top">
        <span className="pill">Question {current + 1} of {questions.length}</span>
        <h1>{q.question}</h1>
      </div>

      <div className="options">
        {q.options.map((opt, idx) => (
          <button key={idx} className={`opt ${answers[current] === opt ? 'active' : ''}`} onClick={() => setAnswers(a => { const copy = [...a]; copy[current] = opt; return copy; })}>
            {opt}
          </button>
        ))}
      </div>

      <div className="actions">
        <button className="button ghost" disabled={current===0} onClick={() => setCurrent(c => c-1)}>Previous</button>
        {current === questions.length - 1 ? (
          <button className="button" disabled={!answers[current]} onClick={submit}>Submit</button>
        ) : (
          <button className="button" disabled={!answers[current]} onClick={() => setCurrent(c => c+1)}>Next</button>
        )}
      </div>

      <style>{`
        .progress { height:8px; background:#f1f5f9; border-radius:999px; overflow:hidden; }
        .progress-bar { height:100%; background:#2563eb; }
        .quiz h1 { color:#111; font-size:22px; margin:12px 0 18px; }
        .pill { background:#e5edff; color:#2563eb; padding:6px 10px; border-radius:999px; font-weight:700; font-size:12px; }
        .options { display:grid; gap:10px; margin:16px 0 24px; }
        .opt { text-align:left; padding:12px 14px; background:#fff; border:2px solid #e5e7eb; border-radius:10px; cursor:pointer; font-weight:600; transition:all .15s ease; }
        .opt:hover { border-color:#c7cfec; background:#f9fbff; }
        .opt.active { border-color:#2563eb; background:#eaf1ff; }
        .actions { display:flex; justify-content:space-between; }
        .button { background:#2563eb; color:#fff; padding:10px 14px; border-radius:8px; text-decoration:none; font-weight:600; border:0; }
        .button.ghost { background:#fff; color:#374151; border:2px solid #d1d5db; }
      `}</style>
    </div>
  );
}

function Centered({ children }) { return <div style={{ textAlign:'center', padding:'3rem', color:'#6b7280' }}>{children}</div>; }

export default Quiz; 