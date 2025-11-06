import express from "express";
import {
  getAllAlertsDesc,
  verifyReport,
} from "../controllers/alertController.js";
import { verifyToken, requireRole } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllAlertsDesc);
router.put("/:id", verifyToken, requireRole("admin"), verifyReport);

export default router;
