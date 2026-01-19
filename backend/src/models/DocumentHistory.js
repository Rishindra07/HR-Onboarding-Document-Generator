import mongoose from "mongoose";

const DocumentHistorySchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeEmail: { type: String, required: true },

  clausesUsed: [{ type: String }], // Clause IDs

  generatedContent: { type: String, required: true },
  pdfPath: { type: String },       // local or cloud path

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("DocumentHistory", DocumentHistorySchema);
