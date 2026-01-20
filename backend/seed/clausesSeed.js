import mongoose from "mongoose";
import dotenv from "dotenv";
import Clause from "../src/models/Clause.js";

dotenv.config(); // Load env vars

const MONGO_URI = process.env.MONGO_URI;

async function seedClauses() {
  try {
    if (!MONGO_URI) {
      console.error("❌ MONGO_URI is undefined. Make sure .env exists and seed is run from backend root.");
      return;
    }

    await mongoose.connect(MONGO_URI);
    console.log(`✔ Connected to DB: ${mongoose.connection.name}`);

    await Clause.deleteMany({});
    console.log("✔ Old clauses removed");

    await Clause.insertMany([
      { title: "Leave Policy", type: "policy", body: "Employees are entitled to paid leaves." },
      { title: "Working Hours", type: "policy", body: "9 AM - 6 PM, Monday to Friday." },
      { title: "Health Benefits", type: "benefit", body: "Full medical coverage from date of joining." },
      { title: "Team Introduction", type: "team_intro", body: "You will join the Engineering Team." }
    ]);

    console.log("✔ Clauses Seeded Successfully");

  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("✔ DB Disconnected");
  }
}

seedClauses();
