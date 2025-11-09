import express from "express";
import {
  createUser,
  getAllUsersDesc,
  getUserbyID,
  getUserStatus,
  userLogin,
  userLogout,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken, requireRole } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, requireRole("admin"), getAllUsersDesc);
router.get("/get", verifyToken, getUserbyID);
router.get("/status", verifyToken, getUserStatus);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.post("/", createUser);
router.put("/:id", verifyToken, requireRole("admin"), updateUser);
router.delete("/:id", verifyToken, requireRole("admin"), deleteUser);

export default router;
