import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './LoginPage.css'; // Using our updated LoginPage CSS

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { login, userInfo, isLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to home
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is handled in the context
    }
  };

  return (
    <div className="login-page">
      <div className="decorative-shape shape-top-right"></div>
      <div className="decorative-shape shape-bottom-left"></div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-illustration">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M65 35H35C32.2386 35 30 37.2386 30 40V70C30 72.7614 32.2386 75 35 75H65C67.7614 75 70 72.7614 70 70V40C70 37.2386 67.7614 35 65 35Z" fill="#dbeafe"/>
              <path d="M50 55C53.866 55 57 51.866 57 48C57 44.134 53.866 41 50 41C46.134 41 43 44.134 43 48C43 51.866 46.134 55 50 55Z" fill="#3b82f6"/>
              <path d="M65 75H35C32.2 75 30 72.8 30 70V62.7C30 59.3 32 56.2 35.2 54.9C38.4 53.6 42.1 52 50 52C57.9 52 61.6 53.6 64.8 54.9C67.9 56.2 70 59.3 70 62.7V70C70 72.8 67.8 75 65 75Z" fill="#1e3a8a"/>
              <path d="M85 25H15C12.2386 25 10 27.2386 10 30V30C10 32.7614 12.2386 35 15 35H85C87.7614 35 90 32.7614 90 30V30C90 27.2386 87.7614 25 85 25Z" fill="#bfdbfe"/>
            </svg>
          </div>
          
          <h1 className="login-title">Welcome Back</h1>
          {error && <div className="error-message">{error}</div>}
          {formError && <div className="error-message">{formError}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email"><span className="label-icon">✉️</span> Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"><span className="label-icon">🔒</span> Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-submit-btn" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-footer">
            Don't have an account yet? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
