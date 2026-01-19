import express from "express";
import Template from "../models/Template.js";

const router = express.Router();

// CREATE Template
router.post("/", async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json(template);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ All Templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Single Template
router.get("/:id", async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ error: "Template not found" });
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Template
router.put("/:id", async (req, res) => {
  try {
    const updated = await Template.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Template not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Template
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Template not found" });
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
