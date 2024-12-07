const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout route (GET request)
router.get("/logout", (req, res) => {
  res.clearCookie("authtoken", {
    httpOnly: true, // Match this with your cookie settings
    secure: process.env.NODE_ENV === "production", // Match this with your cookie settings
    sameSite: "strict", // Match this with your cookie settings
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Get user profile (requires authentication)
router.get("/profile", protect, getUserProfile);

module.exports = router;
