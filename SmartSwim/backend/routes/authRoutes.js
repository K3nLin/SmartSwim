const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Public routes (No authentication required)
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// Protected routes (Require authentication)
// router.get("/workouts", authMiddleware, getUserWorkouts);
// router.post("/workouts", authMiddleware, saveWorkout);
// router.put("/user", authMiddleware, updateUserProfile);

module.exports = router;
