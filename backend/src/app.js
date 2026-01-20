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
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "http://localhost:3000", // alternative local frontend
  "https://hr-onboarding-document-generator.vercel.app" // production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("⚠️ CORS request from:", origin);
      // For production, comment out the next line to strictly enforce CORS
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

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

export default app;