import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './ApplicationsPage.css';

const ApplicationsPage = () => {
  const { gigId } = useParams();
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [applications, setApplications] = useState([]);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/gigs/${gigId}`, config);
        
        // Check if the user is the creator of the gig
        if (data.creator._id !== userInfo._id) {
          navigate('/my-gigs');
          return;
        }
        
        setGig(data);
      } catch (err) {
        setError('Failed to fetch gig details. Please try again.');
      }
    };
    
    const fetchApplications = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/applications/gig/${gigId}`,
          config
        );
        
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch applications. Please try again.');
        setLoading(false);
      }
    };
    
    if (userInfo) {
      fetchGig();
      fetchApplications();
    }
  }, [gigId, userInfo, navigate]);

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const handleAccept = async (applicationId) => {
    if (window.confirm('Are you sure you want to accept this application?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        await axios.put(
          `${process.env.REACT_APP_API_URL}/applications/${applicationId}/accept`,
          {},
          config
        );
        
        // Update local state
        navigate(`/gigs/${gigId}`);
      } catch (err) {
        alert(err.response && err.response.data.message
          ? err.response.data.message
          : 'Error accepting application');
      }
    }
  };

  const handleReject = async (applicationId) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        await axios.put(
          `${process.env.REACT_APP_API_URL}/applications/${applicationId}/reject`,
          {},
          config
        );
        
        // Update local state
        setApplications(applications.map(app => 
          app._id === applicationId ? { ...app, status: 'rejected' } : app
        ));
      } catch (err) {
        alert(err.response && err.response.data.message
          ? err.response.data.message
          : 'Error rejecting application');
      }
    }
  };

  if (loading) {
    return (
      <div className="applications-page modern-page">
        <div className="page-hero">
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <div className="loading-spinner-modern"></div>
            <h2>Loading Talent Pool...</h2>
            <p>Finding the best candidates for your project</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applications-page modern-page">
        <div className="page-hero error-hero">
          <div className="hero-gradient"></div>
          <div className="hero-content">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <Link to="/my-gigs" className="cta-button">Back to My Gigs</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page modern-page">
      <div className="page-hero compact-hero">
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <div className="breadcrumb-nav">
            <Link to={`/gigs/${gigId}`} className="breadcrumb-link">
              ← Back to Gig
            </Link>
          </div>
          <h1 className="hero-title">Talent Applications</h1>
          <p className="hero-subtitle">Review and select from qualified professionals for: <strong>{gig?.title}</strong></p>
          
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-number">{applications.length}</span>
              <span className="stat-label">Total Applications</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{applications.filter(app => app.status === 'pending').length}</span>
              <span className="stat-label">Pending Review</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{applications.filter(app => app.status === 'accepted').length}</span>
              <span className="stat-label">Accepted</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="main-content compact-content">
        <div className="filter-section modern-filters">
          <div className="filter-header">
            <h3>Filter Applications</h3>
            <p>Find the perfect match for your project</p>
          </div>
          <div className="filter-buttons">
            <button 
              className={`filter-btn modern-filter ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <span className="filter-count">{applications.length}</span>
              All Applications
            </button>
            <button 
              className={`filter-btn modern-filter ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              <span className="filter-count">{applications.filter(app => app.status === 'pending').length}</span>
              Pending
            </button>
            <button 
              className={`filter-btn modern-filter ${filter === 'accepted' ? 'active' : ''}`}
              onClick={() => setFilter('accepted')}
            >
              <span className="filter-count">{applications.filter(app => app.status === 'accepted').length}</span>
              Accepted
            </button>
            <button 
              className={`filter-btn modern-filter ${filter === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilter('rejected')}
            >
              <span className="filter-count">{applications.filter(app => app.status === 'rejected').length}</span>
              Rejected
            </button>
          </div>
        </div>
        
        {filteredApplications.length === 0 ? (
          <div className="empty-state modern-empty">
            <div className="empty-icon">📋</div>
            <h3>No Applications Found</h3>
            <p>No applications match your current filter. Try adjusting your criteria or promote your gig to attract more talent.</p>
            <Link to="/gigs" className="cta-button secondary">Browse Similar Gigs</Link>
          </div>
        ) : (
          <div className="applications-grid modern-grid">
            <div className="grid-header">
              <h3>Qualified Candidates</h3>
              <p>Review profiles, proposals, and make informed hiring decisions</p>
            </div>
            
            {filteredApplications.map((app) => (
              <div key={app._id} className="application-card modern-card">
                <div className="card-status">
                  <span className={`status-indicator ${app.status}`}></span>
                </div>
                
                <div className="applicant-profile">
                  <div className="profile-header">
                    {app.applicant.profilePicture ? (
                      <img 
                        src={app.applicant.profilePicture} 
                        alt={app.applicant.name}
                        className="profile-avatar"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {app.applicant.name.charAt(0)}
                      </div>
                    )}
                    <div className="profile-info">
                      <h4 className="applicant-name">{app.applicant.name}</h4>
                      <div className="profile-stats">
                        {app.applicant.rating > 0 && (
                          <div className="rating-display">
                            <span className="stars">⭐</span>
                            <span>{app.applicant.rating.toFixed(1)}</span>
                            <span className="rating-meta">({app.applicant.completedGigs} gigs)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="application-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <span className="detail-label">Proposed Budget:</span>
                        <span className="detail-value highlight">${app.proposedAmount}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Applied:</span>
                        <span className="detail-value">{new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="proposal-section">
                  <h5>Cover Letter & Proposal</h5>
                  <div className="cover-letter-content">
                    <p>{app.coverLetter}</p>
                  </div>
                </div>
                
                {app.applicant.skills && app.applicant.skills.length > 0 && (
                  <div className="skills-showcase">
                    <h6>Skills & Expertise</h6>
                    <div className="skills-tags">
                      {app.applicant.skills.map((skill, index) => (
                        <span key={index} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="action-panel">
                  {gig?.status === 'open' && app.status === 'pending' && (
                    <div className="primary-actions">
                      <button 
                        onClick={() => handleAccept(app._id)}
                        className="action-btn accept-btn"
                      >
                        <span className="btn-icon">✓</span>
                        Accept & Hire
                      </button>
                      <button 
                        onClick={() => handleReject(app._id)}
                        className="action-btn reject-btn"
                      >
                        <span className="btn-icon">✕</span>
                        Reject
                      </button>
                    </div>
                  )}
                  
                  <Link 
                    to={`/messages/${app.applicant._id}`}
                    className="action-btn message-btn"
                  >
                    <span className="btn-icon">💬</span>
                    Message Candidate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="hiring-tips-section">
          <h3>💡 Hiring Tips</h3>
          <div className="tips-grid">
            <div className="tip-item">
              <strong>Review Portfolios:</strong> Check their previous work and ratings
            </div>
            <div className="tip-item">
              <strong>Ask Questions:</strong> Message candidates to clarify project details
            </div>
            <div className="tip-item">
              <strong>Set Expectations:</strong> Clearly communicate deadlines and requirements
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
