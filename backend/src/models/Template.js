import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },  // e.g. Company Policy, Benefits, Team Introduction
  content: { type: String, required: true },   // AI-ready text with variables e.g. "{{employeeName}}"
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("Template", TemplateSchema);
