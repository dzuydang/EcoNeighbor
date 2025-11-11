import express from "express";
import {
  getNumVerifiedReports,
  getNumUnverifiedReports,
  getNumReports,
  getNumAdmin,
  getNumAuthority,
  getNumResident,
} from "../controllers/dataController.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/getNumVerifiedReports", verifyToken, getNumVerifiedReports);
router.get("/getNumUnverifiedReports", verifyToken, getNumUnverifiedReports);
router.get("/getNumReports", verifyToken, getNumReports);
router.get("/getNumAdmin", verifyToken, getNumAdmin);
router.get("/getNumAuthority", verifyToken, getNumAuthority);
router.get("/getNumResident", verifyToken, getNumResident);

export default router;
