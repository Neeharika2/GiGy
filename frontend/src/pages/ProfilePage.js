import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../components/layout/Header.css';
import './ProfilePage.css';

const ProfilePage = () => {
  const { userInfo, updateProfile, uploadProfilePicture, isLoading, error } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      setBio(userInfo.bio || '');
      setSkills(userInfo.skills ? userInfo.skills.join(', ') : '');
      setLocation(userInfo.location || '');

      const fetchUserReviews = async () => {
        setReviewsLoading(true);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/reviews/user/${userInfo._id}`,
            config
          );

          setUserReviews(data);
        } catch (err) {
          console.error('Error fetching reviews:', err);
        } finally {
          setReviewsLoading(false);
        }
      };

      fetchUserReviews();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    // Remove password validation from personal info
    try {
      const userData = {
        name,
        email,
        bio,
        skills: skills ? skills.split(',').map(skill => skill.trim()) : [],
        location
      };

      await updateProfile(userData);
      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      // Error is handled in the context
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');

    if (!image) {
      setFormError('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      await uploadProfilePicture(formData);
      setSuccessMessage('Profile picture updated successfully');
      setImage(null);
    } catch (err) {
      // Error is handled in the context
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/change-password`,
        { currentPassword, newPassword },
        config
      );

      setPasswordSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      setPasswordError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Error changing password. Please try again.'
      );
    }
  };

  return (
    <div className="profile-page modern-dashboard">
      <div className="dashboard-hero">
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <div className="user-welcome">
            <div className="user-avatar-section">
              {userInfo?.profilePicture ? (
                <img src={userInfo.profilePicture} alt="Profile" className="user-avatar-large" />
              ) : (
                <div className="avatar-placeholder-large">
                  {userInfo?.name?.charAt(0)}
                </div>
              )}
              <div className="online-status active"></div>
            </div>
            <div className="welcome-text">
              <h1>Welcome back, {userInfo?.name?.split(' ')[0]}!</h1>
              <p>Manage your professional profile and grow your freelance career</p>
            </div>
          </div>
          
          <div className="profile-stats-bar">
            <div className="stat-card">
              <span className="stat-number">{userInfo?.rating?.toFixed(1) || '0.0'}</span>
              <span className="stat-label">Rating</span>
              <span className="stat-icon">⭐</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{userInfo?.completedGigs || 0}</span>
              <span className="stat-label">Projects</span>
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{userReviews.length}</span>
              <span className="stat-label">Reviews</span>
              <span className="stat-icon">💬</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="profile-navigation modern-tabs">
          <button 
            className={`nav-tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <span className="tab-icon">👤</span>
            Personal Info
          </button>
          <button 
            className={`nav-tab ${activeTab === 'picture' ? 'active' : ''}`}
            onClick={() => setActiveTab('picture')}
          >
            <span className="tab-icon">📸</span>
            Profile Picture
          </button>
          <button 
            className={`nav-tab ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            <span className="tab-icon">🔐</span>
            Security
          </button>
          <button 
            className={`nav-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <span className="tab-icon">⚙️</span>
            Preferences
          </button>
          <button 
            className={`nav-tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <span className="tab-icon">⭐</span>
            Reviews
          </button>
        </div>

        {activeTab === 'personal' && (
          <div className="profile-section modern-section">
            <div className="section-header">
              <h2>Professional Information</h2>
              <p>Keep your profile updated to attract better opportunities</p>
            </div>
            
            <div className="section-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">📈</span>
                <span>Complete profiles get 3x more project invitations</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span>Accurate skills matching increases hire rate by 60%</span>
              </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {formError && <div className="alert alert-error">{formError}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="profile-form modern-form">
              <div className="form-grid modern-grid">
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
                    required
                    className="modern-input"
                  />
                </div>
                <div className="form-group modern-group full-width">
                  <label htmlFor="bio">
                    <span className="label-icon">📝</span>
                    Professional Bio
                    <span className="label-hint">Tell clients about your expertise</span>
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="4"
                    className="modern-textarea"
                    placeholder="Describe your professional background, skills, and what makes you unique..."
                  ></textarea>
                </div>
                <div className="form-group modern-group">
                  <label htmlFor="skills">
                    <span className="label-icon">🛠️</span>
                    Skills & Expertise
                    <span className="label-hint">Comma separated</span>
                  </label>
                  <input
                    id="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="modern-input"
                    placeholder="JavaScript, React, Node.js, UI/UX Design..."
                  />
                </div>
                <div className="form-group modern-group">
                  <label htmlFor="location">
                    <span className="label-icon">📍</span>
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="modern-input"
                    placeholder="City, Country or Remote"
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn modern-submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">💾</span>
                    Update Profile
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'picture' && (
          <div className="profile-section">
            <h2 className="section-title">Profile Picture</h2>
            <div className="profile-picture-section">
              {userInfo?.profilePicture && (
                <img 
                  src={userInfo.profilePicture} 
                  alt="Profile" 
                  className="profile-picture-large"
                />
              )}
              
              <form onSubmit={handleImageUpload} className="file-upload">
                <div className="form-group">
                  <label htmlFor="image">Upload new profile picture</label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={isLoading || !image}>
                  {isLoading ? 'Uploading...' : 'Upload Image'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="profile-section">
            <h2 className="section-title">Change Password</h2>
            {passwordError && <div className="error-message">{passwordError}</div>}
            {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

            <form onSubmit={handlePasswordChange} className="password-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Change Password
              </button>
            </form>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="profile-section">
            <h2 className="section-title">Account Preferences</h2>
            <div className="preferences-grid">
              <div className="preference-item">
                <div className="preference-content">
                  <h3>Email Notifications</h3>
                  <p>Receive notifications about new gig opportunities</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-content">
                  <h3>Profile Visibility</h3>
                  <p>Make your profile visible to potential clients</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="preference-item">
                <div className="preference-content">
                  <h3>SMS Notifications</h3>
                  <p>Receive SMS alerts for urgent gig updates</p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="profile-section modern-section">
            <div className="section-header">
              <h2>Client Reviews & Ratings</h2>
              <p>Your reputation speaks for your quality work</p>
            </div>
            
            {reviewsLoading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading your reviews...</p>
              </div>
            ) : userReviews.length === 0 ? (
              <div className="empty-state reviews-empty">
                <div className="empty-icon">⭐</div>
                <h3>No Reviews Yet</h3>
                <p>Complete some projects to start receiving reviews from clients!</p>
                <Link to="/gigs" className="cta-button">Find Projects</Link>
              </div>
            ) : (
              <div className="reviews-showcase">
                <div className="rating-summary">
                  <div className="overall-rating-card">
                    <div className="rating-display-large">
                      <span className="rating-number">{userInfo?.rating?.toFixed(1) || '0.0'}</span>
                      <div className="stars-display">
                        {'⭐'.repeat(Math.round(userInfo?.rating || 0))}
                      </div>
                      <span className="review-count">Based on {userReviews.length} reviews</span>
                    </div>
                  </div>
                </div>
                
                <div className="reviews-list modern-list">
                  {userReviews.map((review) => (
                    <div key={review._id} className="review-card modern-card">
                      <div className="review-header">
                        {review.reviewer.profilePicture && (
                          <img 
                            src={review.reviewer.profilePicture} 
                            alt={review.reviewer.name} 
                            className="reviewer-avatar"
                          />
                        )}
                        <div className="review-meta">
                          <p className="reviewer-name">{review.reviewer.name}</p>
                          <p className="review-rating">Rating: {review.rating} / 5</p>
                        </div>
                      </div>
                      <p className="review-content">{review.comment}</p>
                      <p className="review-gig">
                        For gig: {review.gig.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};



export default ProfilePage;
