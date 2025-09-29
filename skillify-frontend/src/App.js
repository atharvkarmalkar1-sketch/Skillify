import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Institutes from './components/Institutes';
import Quiz from './components/Quiz';
import Auth from './components/Auth';
import Streams from './components/Streams';
import Exams from './components/Exams';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{
          backgroundColor: '#2c3e50',
          padding: '1rem',
          color: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{ margin: 0 }}>Skillify</h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
              <Link to="/streams" style={{ color: 'white', textDecoration: 'none' }}>Streams</Link>
              <Link to="/exams" style={{ color: 'white', textDecoration: 'none' }}>Exams</Link>
              <Link to="/institutes" style={{ color: 'white', textDecoration: 'none' }}>Institutes</Link>
              <Link to="/quiz" style={{ color: 'white', textDecoration: 'none' }}>Career Quiz</Link>
              <Link to="/auth" style={{ color: 'white', textDecoration: 'none' }}>Login/Register</Link>
            </div>
          </div>
        </nav>

        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/streams" element={<Streams />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/institutes" element={<Institutes />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
