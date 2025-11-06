import express from "express";
import {
  createUser,
  getAllUsersDesc,
  getUserbyID,
  userLogin,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken, requireRole } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, requireRole("admin"), getAllUsersDesc);
router.get("/:id", verifyToken, getUserbyID);
router.post("/login", userLogin);
router.post("/", createUser);
router.put("/:id", verifyToken, requireRole("admin"), updateUser);
router.delete("/:id", verifyToken, requireRole("admin"), deleteUser);

export default router;
