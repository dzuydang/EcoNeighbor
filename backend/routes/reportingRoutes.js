import express from "express";
import {
  createReport,
  getAllReportsDesc,
  getReport,
  deleteReport,
  updateReport,
} from "../controllers/reportingController.js";
import { verifyToken, requireRole } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllReportsDesc);
router.get("/:id", verifyToken, getReport);
router.post("/", verifyToken, createReport);
router.put("/:id", verifyToken, updateReport);
router.delete("/:id", verifyToken, deleteReport);

export default router;
