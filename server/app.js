require("dotenv").config(); // Ensure this is the first line
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.wrchw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

if (!DB_URL) {
  console.error("DB_URL is not defined in environment variables");
  process.exit(1); // Exit if DB_URL is not defined
}

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Error connecting to database", error));

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust to your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json()); // Use express.json() only
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong!" });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(4000, () =>
  console.log("Server is running at http://localhost:4000")
);
