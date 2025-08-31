import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './LoginPage.css'; // Use consistent login styles

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { register, userInfo, isLoading, error } = useContext(AuthContext);
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
    
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      // Error is handled in the context
    }
  };

  return (
    <div className="register-page modern-auth-page">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="auth-container modern-container">
        <div className="auth-content">
          <div className="auth-hero">
            <div className="brand-section">
              <h1 className="brand-title">Join GiGy</h1>
              <p className="brand-subtitle">Your Gateway to Freelance Success</p>
            </div>
            
            <div className="value-props">
              <div className="value-prop">
                <span className="prop-icon">🚀</span>
                <div className="prop-content">
                  <h4>Launch Your Career</h4>
                  <p>Access thousands of projects from verified clients</p>
                </div>
              </div>
              <div className="value-prop">
                <span className="prop-icon">💰</span>
                <div className="prop-content">
                  <h4>Earn More</h4>
                  <p>Set your rates and work on your terms</p>
                </div>
              </div>
              <div className="value-prop">
                <span className="prop-icon">⭐</span>
                <div className="prop-content">
                  <h4>Build Reputation</h4>
                  <p>Grow your profile with real client reviews</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="auth-form-section">
            <div className="form-header">
              <h2>Create Your Account</h2>
              <p>Join thousands of successful freelancers</p>
            </div>
            
            {error && <div className="error-message modern-error">{error}</div>}
            {formError && <div className="error-message modern-error">{formError}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form modern-form">
              <div className="form-group modern-group">
                <label htmlFor="name">
                  <span className="label-icon">👤</span>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="modern-input"
                />
              </div>
              
              <div className="form-group modern-group">
                <label htmlFor="email">
                  <span className="label-icon">✉️</span>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="modern-input"
                />
              </div>
              
              <div className="form-group modern-group">
                <label htmlFor="password">
                  <span className="label-icon">🔒</span>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="modern-input"
                />
              </div>
              
              <div className="form-group modern-group">
                <label htmlFor="confirmPassword">
                  <span className="label-icon">🔐</span>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="modern-input"
                />
              </div>
              
              <button type="submit" className="submit-btn modern-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Start Your Journey
                  </>
                )}
              </button>
            </form>
            
            <div className="auth-footer modern-footer">
              <div className="trust-indicators">
                <div className="trust-item">
                  <span className="trust-icon">🔐</span>
                  <span>Secure & Private</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">⚡</span>
                  <span>Instant Access</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">💯</span>
                  <span>100% Free</span>
                </div>
              </div>
              
              <p className="login-prompt">
                Already have an account? 
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
