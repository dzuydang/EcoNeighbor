import express from "express";
import {createReport, getAllReports, getReport, deleteReport, updateReport} from "../controllers/reportingController.js"
const router = express.Router();

export default router;

router.get("/", getAllReports);
router.get("/:id", getReport);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);
