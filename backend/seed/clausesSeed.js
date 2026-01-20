import mongoose from "mongoose";
import Clause from "../src/models/Clause.js"; // adjust path if needed

// Update with your DB connection URL if different
const MONGO_URI = process.env.MONGO_URI;

async function seedClauses() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ✔");

    // Clear existing clauses (optional)
    await Clause.deleteMany({});
    console.log("Old clauses removed ✔");

    const clauses = [
      {
        title: "Leave Policy",
        type: "policy",
        body: "Employees are entitled to 20 days of paid leave annually, subject to manager approval."
      },
      {
        title: "Working Hours",
        type: "policy",
        body: "Standard working hours are from 9 AM to 6 PM, Monday to Friday, with a 1-hour lunch break."
      },
      {
        title: "Health Benefits",
        type: "benefit",
        body: "The company provides full health insurance coverage starting from the employee's date of joining."
      },
      {
        title: "Work From Home Guidelines",
        type: "policy",
        body: "Employees may work from home two days a week, depending on role requirements and management approval."
      },
      {
        title: "Team Introduction",
        type: "team_intro",
        body: "You will be joining the Engineering Team, led by Mr. Ramesh Kumar, who will assist with your onboarding."
      }
    ];

    await Clause.insertMany(clauses);
    console.log("Clauses Seeded Successfully ✔");

  } catch (error) {
    console.error("Seeding Error:", error);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed ✔");
  }
}

seedClauses();
