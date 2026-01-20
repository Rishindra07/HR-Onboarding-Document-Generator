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
  "http://localhost:5173",
  "https://hr-onboarding-document-generator.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked: " + origin));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
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