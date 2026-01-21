import express from "express";
import Clause from "../models/Clause.js";

const router = express.Router();

// CREATE Clause
router.post("/", async (req, res) => {
  try {
    const clause = await Clause.create(req.body);
    res.status(201).json(clause);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ All Clauses
router.get("/", async (req, res) => {
  try {
    const clauses = await Clause.find();
    res.json(clauses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Single Clause
router.get("/:id", async (req, res) => {
  try {
    const clause = await Clause.findById(req.params.id);
    if (!clause) return res.status(404).json({ error: "Clause not found" });
    res.json(clause);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Clause
router.put("/:id", async (req, res) => {
  try {
    const updated = await Clause.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Clause not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Clause
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Clause.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Clause not found" });
    res.json({ message: "Clause deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
