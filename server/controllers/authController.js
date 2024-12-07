const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie(
      "authtoken",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
        maxAge: 3600000, // 1 hour
        sameSite: "strict",
      }
    );

    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error); // Log error to server console
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

// Get user profile (requires authentication)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};
