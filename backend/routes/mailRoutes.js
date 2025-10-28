import express from "express";
import { reportIssue } from "../controllers/mailController.js";

const router = express.Router();

router.post("/report-issue", reportIssue);

export default router;
