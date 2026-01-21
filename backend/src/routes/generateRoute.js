import express from "express";
import Clause from "../models/Clause.js";
import DocumentHistory from "../models/DocumentHistory.js";
import { generateMergedContent } from "../services/aiService.js";
import { generatePDF } from "../services/pdfService.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// POST /api/generate
router.post("/", async (req, res) => {
  try {
    const { employeeName, employeeEmail, clauseIds } = req.body;

    if (!employeeName || !employeeEmail || !clauseIds?.length) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Fetch clauses from DB
    const clauses = await Clause.find({ _id: { $in: clauseIds } });

    if (!clauses.length) {
      return res.status(404).json({ error: "No valid clauses found" });
    }

    // Prepare raw clause text for AI
    const clauseTexts = clauses.map(c => ({
      title: c.title,
      type: c.type,
      body: c.body
    }));

    // Ask AI to merge into formatted document
    const mergedContent = await generateMergedContent({
      employeeName,
      employeeEmail,
      clauses: clauseTexts
    });

    // Ensure /generated directory exists
    const outputDir = path.join(process.cwd(), "generated");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    // Generate PDF filename
    const pdfFilename = `${employeeName.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
    const pdfPath = path.join(outputDir, pdfFilename);

    // Create PDF
    await generatePDF(mergedContent, pdfPath);

    // Save history to DB
    const history = await DocumentHistory.create({
      employeeName,
      employeeEmail,
      clausesUsed: clauseIds,
      generatedContent: mergedContent,
      pdfPath
    });
    const publicPath = `/generated/${pdfFilename}`;

    return res.json({
      success: true,
      preview: mergedContent,
      pdfPath: publicPath,
      historyId: history._id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
