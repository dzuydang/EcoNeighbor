import express from "express";
import {
  getAllCenters,
  getCenter,
  createCenter,
  updateCenter,
  deleteCenter,
} from "../controllers/verifiedWasteController.js";
import { verifyToken, requireRole } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getAllCenters);
router.get("/:id", verifyToken, getCenter);
router.post("/", verifyToken, requireRole("admin"), createCenter);
router.put("/:id", verifyToken, requireRole("admin"), updateCenter);
router.delete("/:id", verifyToken, requireRole("admin"), deleteCenter);

export default router;
