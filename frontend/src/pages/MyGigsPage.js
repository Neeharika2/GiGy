import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './MyGigsPage.css';

const MyGigsPage = () => {
  const { userInfo } = useContext(AuthContext);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, open, assigned, completed

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/gigs/user/mygigs`,
          config
        );
        
        setGigs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch your gigs. Please try again.');
        setLoading(false);
      }
    };
    
    if (userInfo) {
      fetchMyGigs();
    }
  }, [userInfo]);

  const filteredGigs = filter === 'all' 
    ? gigs 
    : gigs.filter(gig => gig.status === filter);

  const deleteGig = async (gigId) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        
        await axios.delete(`${process.env.REACT_APP_API_URL}/gigs/${gigId}`, config);
        
        setGigs(gigs.filter(gig => gig._id !== gigId));
      } catch (err) {
        alert(err.response && err.response.data.message
          ? err.response.data.message
          : 'Error deleting gig');
      }
    }
  };

  return (
    <div className="my-gigs-page modern-dashboard">
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className="page-header modern-header">
            <div className="header-content">
              <h1 className="page-title">Project Dashboard</h1>
              <p className="page-subtitle">Manage and track your posted projects</p>
            </div>
            <Link to="/create-gig" className="cta-button primary">
              <span className="btn-icon">➕</span>
              Post New Project
            </Link>
          </div>
          
          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-number">{gigs.length}</span>
              <span className="stat-label">Total Projects</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{gigs.filter(g => g.status === 'open').length}</span>
              <span className="stat-label">Open</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{gigs.filter(g => g.status === 'assigned').length}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{gigs.filter(g => g.status === 'completed').length}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <div className="filter-section modern-filters">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <span className="filter-count">{gigs.length}</span>
              All Projects
            </button>
            <button 
              className={`filter-tab ${filter === 'open' ? 'active' : ''}`}
              onClick={() => setFilter('open')}
            >
              <span className="filter-count">{gigs.filter(g => g.status === 'open').length}</span>
              Open
            </button>
            <button 
              className={`filter-tab ${filter === 'assigned' ? 'active' : ''}`}
              onClick={() => setFilter('assigned')}
            >
              <span className="filter-count">{gigs.filter(g => g.status === 'assigned').length}</span>
              Assigned
            </button>
            <button 
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              <span className="filter-count">{gigs.filter(g => g.status === 'completed').length}</span>
              Completed
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state modern-loading">
            <div className="loading-animation">
              <div className="loading-spinner"></div>
              <h3>Loading Your Projects...</h3>
              <p>Gathering your project portfolio</p>
            </div>
          </div>
        ) : error ? (
          <div className="error-state modern-error">
            <div className="error-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Try Again
            </button>
          </div>
        ) : filteredGigs.length === 0 ? (
          <div className="empty-state modern-empty">
            <div className="empty-illustration">
              <div className="empty-icon">📋</div>
            </div>
            <h3>
              {filter === 'all' ? 'No Projects Yet' : `No ${filter} Projects`}
            </h3>
            <p>
              {filter === 'all' 
                ? "Ready to start your first project? Post a gig and connect with talented freelancers!"
                : `You don't have any ${filter} projects at the moment.`
              }
            </p>
            <div className="empty-actions">
              <Link to="/create-gig" className="cta-button primary">
                <span className="btn-icon">🚀</span>
                Create Your First Project
              </Link>
              <Link to="/gigs" className="cta-button secondary">
                <span className="btn-icon">💡</span>
                Get Inspired
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="projects-grid modern-grid">
              <div className="grid-header">
                <h3>Your Projects</h3>
                <p>Manage timelines, review applications, and track progress</p>
              </div>
              
              {filteredGigs.map((gig) => (
                <div key={gig._id} className="project-card modern-card">
                  <div className="card-header">
                    <div className="project-status">
                      <span className={`status-indicator ${gig.status}`}></span>
                      <span className={`status-label ${gig.status}`}>{gig.status.toUpperCase()}</span>
                    </div>
                    <div className="project-date">
                      {new Date(gig.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h4 className="project-title">{gig.title}</h4>
                    <p className="project-description">
                      {gig.description.substring(0, 120)}...
                    </p>
                    
                    <div className="project-metrics">
                      <div className="metric">
                        <span className="metric-label">Budget:</span>
                        <span className="metric-value budget">${gig.budget}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Duration:</span>
                        <span className="metric-value">{gig.duration}</span>
                      </div>
                      {gig.applications && gig.applications.length > 0 && (
                        <div className="metric">
                          <span className="metric-label">Applications:</span>
                          <span className="metric-value applications">{gig.applications.length}</span>
                        </div>
                      )}
                    </div>

                    {gig.assignedTo && (
                      <div className="assigned-info">
                        <span className="assigned-label">Assigned to:</span>
                        <span className="assigned-name">{gig.assignedTo.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-actions">
                    <Link to={`/gigs/${gig._id}`} className="action-btn primary">
                      <span className="btn-icon">👁️</span>
                      View Details
                    </Link>
                    
                    {gig.status === 'open' && (
                      <>
                        <Link to={`/gigs/edit/${gig._id}`} className="action-btn secondary">
                          <span className="btn-icon">✏️</span>
                          Edit
                        </Link>
                        <button 
                          className="action-btn danger"
                          onClick={() => deleteGig(gig._id)}
                        >
                          <span className="btn-icon">🗑️</span>
                          Delete
                        </button>
                      </>
                    )}

                    {gig.applications && gig.applications.length > 0 && gig.status === 'open' && (
                      <Link to={`/applications/${gig._id}`} className="action-btn highlight">
                        <span className="btn-icon">👥</span>
                        Applications ({gig.applications.length})
                      </Link>
                    )}
                    
                    {gig.status === 'assigned' && (
                      <button 
                        className="action-btn complete"
                        onClick={async () => {
                          try {
                            const config = {
                              headers: {
                                Authorization: `Bearer ${userInfo.token}`,
                              },
                            };
                            
                            await axios.put(
                              `${process.env.REACT_APP_API_URL}/gigs/${gig._id}/complete`,
                              {},
                              config
                            );
                            
                            // Update the local state
                            setGigs(gigs.map(g => g._id === gig._id ? { ...g, status: 'completed' } : g));
                          } catch (err) {
                            alert(err.response && err.response.data.message
                              ? err.response.data.message
                              : 'Error completing gig');
                          }
                        }}
                      >
                        <span className="btn-icon">✅</span>
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="project-insights">
              <h3>💡 Project Management Tips</h3>
              <div className="insights-grid">
                <div className="insight-item">
                  <span className="insight-icon">🎯</span>
                  <div className="insight-content">
                    <strong>Clear Requirements:</strong> Detailed descriptions get 40% more quality applications
                  </div>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">💰</span>
                  <div className="insight-content">
                    <strong>Fair Pricing:</strong> Competitive budgets attract top-tier talent
                  </div>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">⚡</span>
                  <div className="insight-content">
                    <strong>Quick Response:</strong> Respond to applications within 24 hours for best results
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyGigsPage;
                