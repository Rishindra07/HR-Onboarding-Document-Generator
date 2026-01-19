import mongoose from "mongoose";

const ClauseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["policy", "benefit", "team_intro"], 
    required: true 
  },
  body: { type: String, required: true }
});

export default mongoose.model("Clause", ClauseSchema);
