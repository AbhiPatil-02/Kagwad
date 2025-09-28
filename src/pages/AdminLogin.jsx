// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import '../styles/components.css';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login({ mobile, password });

    setLoading(false);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message || 'Invalid credentials');
    }
  };

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-container">
        <h1>Admin Login</h1>
        <p>Access the admin dashboard to manage services</p>
        
        <form onSubmit={handleSubmit}>
          <InputField 
            label="Mobile Number" 
            type="tel" 
            value={mobile} 
            onChange={(e) => setMobile(e.target.value)} 
            placeholder="9876543210"
            required 
          />
          <InputField 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Admin'}
          </Button>
        </form>

        <div className="auth-note">
          <p>Use admin credentials: Mobile: 9876543210, Password: password123</p>
        </div>
      </div>
    </div>
  );
}