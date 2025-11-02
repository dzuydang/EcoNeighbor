import express from "express";
import {
  getAllAlertsDesc,
  verifyReport,
} from "../controllers/alertController.js";

const router = express.Router();

router.get("/", getAllAlertsDesc);
router.put("/:id", verifyReport);

export default router;
