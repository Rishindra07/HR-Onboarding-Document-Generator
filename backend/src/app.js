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

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON bodies

app.use("/generated", express.static(path.join(process.cwd(), "generated")));

// Connect to MongoDB
connectDB();

// Register Routes
app.use("/api/templates", templateRoutes);
app.use("/api/clauses", clauseRoutes);
app.use("/api/generate", generateRoute);

// Test route
app.get("/", (req, res) => {
  res.send("HR Onboarding Document Generator API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});