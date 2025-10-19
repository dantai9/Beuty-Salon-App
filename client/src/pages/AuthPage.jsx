import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './AuthPage.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    salonName: '',
    city: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload =
      mode === 'login'
        ? { email: form.email, password: form.password }
        : {
            name: form.name,
            email: form.email,
            password: form.password,
            role: form.role,
            salonProfile:
              form.role === 'salon'
                ? {
                    name: form.salonName,
                    city: form.city,
                    description: form.description,
                    address: `${form.city}, ${form.salonName}`,
                    amenities: ['Wi-Fi', 'Complimentary drinks', 'Accessible entrance'],
                    services: [
                      { service: 'Signature haircut', duration: 60, price: 95 },
                      { service: 'Luxury color', duration: 120, price: 220 },
                      { service: 'Revitalizing facial', duration: 75, price: 150 },
                    ],
                  }
                : undefined,
          };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Authentication failed');
      }

      const data = await response.json();
      login(data);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-toggle">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>
            Create account
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              <span>Full name</span>
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
          )}
          <label>
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
          {mode === 'register' && (
            <>
              <label>
                <span>I’m booking as</span>
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="client">Client</option>
                  <option value="salon">Salon owner</option>
                </select>
              </label>
              {form.role === 'salon' && (
                <div className="salon-extra">
                  <label>
                    <span>Salon name</span>
                    <input name="salonName" value={form.salonName} onChange={handleChange} required />
                  </label>
                  <label>
                    <span>City</span>
                    <input name="city" value={form.city} onChange={handleChange} required />
                  </label>
                  <label>
                    <span>Signature style</span>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell clients about your vibe and specialties"
                      required
                    />
                  </label>
                </div>
              )}
            </>
          )}
          <button className="gradient-button" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
