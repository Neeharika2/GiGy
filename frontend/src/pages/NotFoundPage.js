import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container modern-error-page">
      <div className="floating-elements">
        <div className="element element-1">🔍</div>
        <div className="element element-2">📄</div>
        <div className="element element-3">🏠</div>
        <div className="element element-4">🔗</div>
      </div>

      <div className="error-hero">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className="error-content">
        <div className="error-card">
          <div className="error-icon">🚧</div>
          <h3>Oops! Something went wrong</h3>
          <p>
            Don't worry, it happens to the best of us. The page you were looking for 
            might have been removed, renamed, or is temporarily unavailable.
          </p>

          <div className="action-buttons">
            <Link to="/" className="action-btn primary-action">
              <span className="btn-icon">🏠</span>
              Go Home
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="action-btn secondary-action"
            >
              <span className="btn-icon">←</span>
              Go Back
            </button>
            <Link to="/gigs" className="action-btn tertiary-action">
              <span className="btn-icon">💼</span>
              Browse Projects
            </Link>
          </div>
        </div>

        <div className="help-section">
          <h4>Popular Pages</h4>
          <div className="quick-links">
            <Link to="/gigs" className="quick-link">
              <span className="link-icon">💼</span>
              <span className="link-text">Browse Projects</span>
            </Link>
            <Link to="/create-gig" className="quick-link">
              <span className="link-icon">➕</span>
              <span className="link-text">Post a Project</span>
            </Link>
            <Link to="/profile" className="quick-link">
              <span className="link-icon">👤</span>
              <span className="link-text">My Profile</span>
            </Link>
            <Link to="/messages" className="quick-link">
              <span className="link-icon">💬</span>
              <span className="link-text">Messages</span>
            </Link>
          </div>
        </div>

        <div className="contact-section">
          <h4>Need Help?</h4>
          <div className="contact-options">
            <a href="mailto:support@gigy.com" className="contact-link">
              <span className="contact-icon">✉️</span>
              Email Support
            </a>
            <a href="/help" className="contact-link">
              <span className="contact-icon">❓</span>
              Help Center
            </a>
            <a href="/contact" className="contact-link">
              <span className="contact-icon">📞</span>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
