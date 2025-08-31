import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  return (
    <main className="main-content">
      <div className="container">
          <section className="hero-section centered">
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
            </div>
            <div className="content-wrapper">
              <div className="hero-badge">
                <span className="badge-icon">⚡</span>
                <span className="badge-text">The Future of Work</span>
              </div>
              <h1 className="main-heading">Connect, Create, Complete</h1>
              <h2 className="sub-heading">Your Gateway to Freelance Success</h2>
              <p className="subtext">
                Join the revolutionary marketplace where talented professionals meet ambitious projects. 
              </p>
              <div className="feature-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">🚀</span>
                  <span className="highlight-text">Launch Your Career</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💼</span>
                  <span className="highlight-text">Find Perfect Matches</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">⭐</span>
                  <span className="highlight-text">Build Your Reputation</span>
                </div>
              </div>
              <div className="search-controls">
                <div className="button-group">
                  <Link to="/gigs">
                    <button className="btn browse-btn">
                      <span>Explore Opportunities</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </Link>
                  <Link to="/gigs/create">
                    <button className="btn post-btn">
                      <span>Start Your Project</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="scroll-indicator">
              <div className="mouse"></div>
              <span>Scroll to explore</span>
            </div>
          </section>
          
          <section className="features-section how-it-works">
            <h2 className="section-title">How GiGy Works</h2>
            <div className="cards-container">
              <div className="feature-card">
                <div className="card-icon">1</div>
                <h3>Post a Gig</h3>
                <p>Describe your task, set a budget, and post it for freelancers to see.</p>
              </div>
              <div className="feature-card">
                <div className="card-icon">2</div>
                <h3>Get Applications</h3>
                <p>Receive applications from skilled individuals ready to work on your task.</p>
              </div>
              <div className="feature-card">
                <div className="card-icon">3</div>
                <h3>Choose and Collaborate</h3>
                <p>Select the best person for your gig and work together to complete it.</p>
              </div>
            </div>
          </section>
          
          <section className="opportunities-section find-work-section">
            <div className="find-work-container">
              <div className="find-work-content">
                <h2 className="section-title">Find Opportunities</h2>
                <p className="find-work-text">
                  Browse available gigs and apply to the ones that match your skills and expertise.
                  Join our growing community of talented professionals and start earning today.
                </p>
                <Link to="/gigs">
                  <button className="find-work-btn">
                    <FaBriefcase className="btn-icon" />
                    <span>Find Work Now</span>
                  </button>
                </Link>
              </div>
            </div>
          </section>
          
          <section className="benefits-section why-choose-gigy">
            <div className="content-wrapper">
              <h2 className="section-title">Why Choose GiGy</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>Real-time chat with local workers</p>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>No middleman fees</p>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>Safe & verified community</p>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>Post and earn anytime</p>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>Browse gigs tailored to your skills</p>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>Transparent gig history & reviews</p>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>Instant notifications for new gigs</p>
                </div>
                <div className="benefit-item">
                  <span className="checkmark">✓</span>
                  <p>User-friendly interface</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
};


export default HomePage;
