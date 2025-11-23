import express from "express";
import {
  getAllAlertsDesc,
  verifyReport,
} from "../controllers/alertController.js";

import { verifyToken, requireRole } from "../utils/verify.js";
import { generateRecommendation } from "../utils/gemini.js";
import { query } from "../config/db.js";

const router = express.Router();

router.get("/", verifyToken, getAllAlertsDesc);

router.put("/:id", verifyToken, requireRole("admin"), verifyReport);

router.post("/:id/recommend", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get the report from DB
    const { rows } = await query(
      "SELECT title, description FROM reports WHERE report_id = $1",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Report not found" });
    }

    const { title, description } = rows[0];

    // 2. Ask Gemini for a recommendation
    const aiAdvice = await generateRecommendation(title, description);

    // 3. Return AI-generated recommendation
    res.json({
      report_id: id,
      recommendation: aiAdvice,
    });
  } catch (error) {
    console.error("AI recommendation error:", error);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
});

export default router;
