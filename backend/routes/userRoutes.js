const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  getUserById,
  updateUserProfile,
  uploadProfilePicture,
  changePassword
} = require('../controllers/userController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/change-password', protect, changePassword);
router.post('/profile/picture', protect, uploadMiddleware.single('image'), uploadProfilePicture);

module.exports = router;
