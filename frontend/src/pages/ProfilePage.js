import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../components/layout/Header.css';
import './ProfilePage.css';

const ProfilePage = () => {
  const { userInfo, updateProfile, uploadProfilePicture, isLoading, error } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account settings and preferences</p>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 'picture' ? 'active' : ''}`}
            onClick={() => setActiveTab('picture')}
          >
            Profile Picture
          </button>
          <button 
            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </button>
          <button 
            className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        {activeTab === 'personal' && (
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            {error && <div className="error-message">{error}</div>}
            {formError && <div className="error-message">{formError}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="skills">Skills (comma separated)</label>
                  <input
                    id="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
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
          <div className="profile-section">
            <h2 className="section-title">Reviews & Ratings</h2>
            {reviewsLoading ? (
              <p>Loading reviews...</p>
            ) : userReviews.length === 0 ? (
              <div className="empty-reviews">
                <p>No reviews yet.</p>
                <p>Complete some gigs to start receiving reviews!</p>
              </div>
            ) : (
              <div className="reviews-stats">
                <div className="rating-overview">
                  <div className="overall-rating">
                    <span className="rating-number">{userInfo?.rating?.toFixed(1) || '0.0'}</span>
                    <span className="rating-stars">★★★★★</span>
                    <span className="review-count">({userReviews.length} reviews)</span>
                  </div>
                </div>
                
                <div className="reviews-grid">
                  {userReviews.map((review) => (
                    <div key={review._id} className="review-card">
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
