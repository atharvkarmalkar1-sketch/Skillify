import React, { useState } from 'react';

function Auth() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = activeTab === 'login' 
      ? { username: formData.username, password: formData.password }
      : formData;

    try {
      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (activeTab === 'login' && data.token) {
          localStorage.setItem('token', data.token);
          setMessage('Login successful!');
          setMessageType('success');
        } else {
          setMessage('Registration successful! You can now login.');
          setMessageType('success');
          setActiveTab('login');
          setFormData({ username: '', email: '', password: '' });
        }
      } else {
        setMessage(data.error || 'An error occurred');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Failed to connect to server. Make sure your backend is running.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '2rem', textAlign: 'center' }}>
        {activeTab === 'login' ? 'Login' : 'Register'}
      </h1>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '2rem',
        backgroundColor: '#fff'
      }}>
        <div style={{ display: 'flex', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              backgroundColor: activeTab === 'login' ? '#3498db' : '#f8f9fa',
              color: activeTab === 'login' ? 'white' : '#666',
              cursor: 'pointer',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              backgroundColor: activeTab === 'register' ? '#3498db' : '#f8f9fa',
              color: activeTab === 'register' ? 'white' : '#666',
              cursor: 'pointer',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px'
            }}
          >
            Register
          </button>
        </div>

        {message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '5px',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
            />
          </div>

          {activeTab === 'register' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: loading ? '#ccc' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : (activeTab === 'login' ? 'Login' : 'Register')}
          </button>
        </form>

        {activeTab === 'login' && (
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
            Don't have an account?{' '}
            <button
              onClick={() => setActiveTab('register')}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Register here
            </button>
          </p>
        )}

        {activeTab === 'register' && (
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
            Already have an account?{' '}
            <button
              onClick={() => setActiveTab('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Login here
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth; 