import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './MyApplicationsPage.css';

const MyApplicationsPage = () => {
  const { userInfo } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/applications/myapplications`,
          config
        );
        
        setApplications(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch your applications. Please try again.');
        setLoading(false);
      }
    };
    
    if (userInfo) {
      fetchMyApplications();
    }
  }, [userInfo]);

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  return (
    <div className="my-applications-page modern-dashboard">
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="applications-header modern-header">
            <div className="header-content">
              <h1>My Applications</h1>
            </div>
            <Link to="/gigs" className="browse-btn">
              Browse More Gigs
            </Link>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        {/* Filter Buttons */}
        <div className="filter-container modern-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`}
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
        
        {loading ? (
          <div className="loading-container modern-loading">
            <div className="loading-spinner"></div>
            <p>Loading your applications...</p>
          </div>
        ) : error ? (
          <div className="error-container modern-error">
            <p>{error}</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="empty-container modern-empty">
            <p>No applications found. {filter !== 'all' && 'Try a different filter or '} 
              <Link to="/gigs">apply to some gigs</Link>.
            </p>
          </div>
        ) : (
          <div className="applications-container">
            {filteredApplications.map((app) => (
              <div key={app._id} className="application-card modern-card">
                <h3>Application for: {app.gig.title}</h3>
                
                <div className="application-details">
                  <div className="detail-group">
                    <p><strong>Your Proposed Budget:</strong> ${app.proposedAmount}</p>
                    <p><strong>Gig Budget:</strong> ${app.gig.budget}</p>
                  </div>
                  <div className="detail-group">
                    <p>
                      <strong>Status:</strong> 
                      <span className={`status-badge status-${app.status}`}>
                        {app.status}
                      </span>
                    </p>
                    <p><strong>Applied on:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="cover-letter-section">
                  <h4>Your Cover Letter:</h4>
                  <p className="cover-letter-content">
                    {app.coverLetter}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="action-buttons">
                  <Link to={`/gigs/${app.gig._id}`} className="action-btn view-btn">
                    View Gig Details
                  </Link>
                  
                  {app.status === 'accepted' && (
                    <Link to={`/messages/${app.gig.creator}`} className="action-btn message-btn">
                      Message Client
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
