import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container modern-error-page">
      <div className="error-background">
        <div className="floating-elements">
          <div className="element element-1">🔍</div>
          <div className="element element-2">📄</div>
          <div className="element element-3">❓</div>
          <div className="element element-4">💼</div>
        </div>
        <div className="gradient-overlay"></div>
      </div>
      
      <div className="error-content">
        <div className="error-illustration modern-illustration">
          <div className="error-code">404</div>
          <div className="error-visual">
            <div className="broken-link">🔗</div>
            <div className="search-icon">🔍</div>
          </div>
        </div>
        
        <div className="error-message-section">
          <h1 className="error-title">Oops! Page Not Found</h1>
          <p className="error-description">
            The page you're looking for seems to have taken a different path. 
            Don't worry, there are plenty of opportunities waiting for you!
          </p>
          
          <div className="suggested-actions">
            <h3>What would you like to do?</h3>
            <div className="action-buttons">
              <Link to="/" className="action-btn primary-action">
                <span className="btn-icon">🏠</span>
                Return Home
              </Link>
              <Link to="/gigs" className="action-btn secondary-action">
                <span className="btn-icon">💼</span>
                Browse Gigs
              </Link>
              <Link to="/create-gig" className="action-btn tertiary-action">
                <span className="btn-icon">➕</span>
                Post a Gig
              </Link>
            </div>
          </div>
          
          <div className="help-section">
            <h4>Need Help?</h4>
            <p>If you believe this is an error, please contact our support team.</p>
            <div className="contact-options">
              <a href="mailto:support@gigy.com" className="contact-link">
                <span className="contact-icon">✉️</span>
                Email Support
              </a>
              <Link to="/help" className="contact-link">
                <span className="contact-icon">❓</span>
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="popular-sections">
        <h3>Popular Sections</h3>
        <div className="quick-links">
          <Link to="/gigs" className="quick-link">
            <span className="link-icon">💼</span>
            <span className="link-text">Find Work</span>
          </Link>
          <Link to="/my-gigs" className="quick-link">
            <span className="link-icon">📊</span>
            <span className="link-text">My Projects</span>
          </Link>
          <Link to="/messages" className="quick-link">
            <span className="link-icon">💬</span>
            <span className="link-text">Messages</span>
          </Link>
          <Link to="/profile" className="quick-link">
            <span className="link-icon">👤</span>
            <span className="link-text">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
