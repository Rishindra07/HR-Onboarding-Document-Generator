import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";

import templateRoutes from "./routes/templateRoute.js";
import clauseRoutes from "./routes/clauseRoutes.js";
import generateRoute from "./routes/generateRoute.js";
import path from "path";
dotenv.config();

const app = express();

// CORS middleware - Allow all origins 
app.use(cors(
  "http://localhost:5173"
));

app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use("/generated", express.static(path.join(process.cwd(), "generated")));

// Connect to MongoDB (async, doesn't block server startup)
connectDB().catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "HR Onboarding Document Generator API is running..." });
});

// Register Routes
app.use("/api/templates", templateRoutes);
app.use("/api/clauses", clauseRoutes);
app.use("/api/generate", generateRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({ 
    error: err.message || "Internal Server Error",
    status: err.status || 500
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});

export default app;