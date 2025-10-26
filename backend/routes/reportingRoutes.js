import express from "express";
import {createReport, getAllReportsDesc, getReport, deleteReport, updateReport} from "../controllers/reportingController.js"
const router = express.Router();

export default router;

router.get("/", getAllReportsDesc);
router.get("/:id", getReport);
router.post("/", createReport);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);
