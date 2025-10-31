import express from "express";
import {
  createUser,
  getAllUsersDesc,
  getUserbyID,
  userLogin,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsersDesc);
router.get("/:id", getUserbyID);
router.post("/login", userLogin);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
