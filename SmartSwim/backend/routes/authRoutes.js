const express = require('express');
const {authMiddleware} = require('../middleware/authMiddleware.js');
const {registerUser, loginUser} = require('../controllers/authController.js');
const {
  createWorkout,
  getWorkoutHistory,
} = require('../controllers/workoutsController.js');

const router = express.Router();

// Public routes (No authentication required)
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Protected routes (Require authentication)
router.get('/auth/tabs/workouts', authMiddleware, getWorkoutHistory);
router.post('/auth/tabs/workouts', authMiddleware, createWorkout);
// router.put("/user", authMiddleware, updateUserProfile);

module.exports = router;
