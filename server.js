// server.js
const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./backend/config/db");

// Load environment variables
dotenv.config({ path: './.env' });

// MongoDB Connection
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./backend/routes/userRoutes")); // Teacher routes
app.use("/api/v1/learner", require("./backend/routes/learnerRoutes")); // Learner routes
app.use("/api/v1/material", require("./backend/routes/materialRoutes")); // Material routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack.red);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`.bgCyan.white
  );
});