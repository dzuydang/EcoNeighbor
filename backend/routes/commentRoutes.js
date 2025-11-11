import express from "express";
import {
  createComment,
  getCommentsByReport,
  updateComment,
  deleteComment,
  upvoteComment,
} from "../controllers/commentController.js";
import { verifyToken, requireRole } from "../utils/verify.js";

const router = express.Router();

router.post("/", verifyToken, createComment);
router.get("/:report_id", verifyToken, getCommentsByReport);
router.put("/:comment_id", verifyToken, requireRole("admin"), updateComment);
router.delete("/:comment_id", verifyToken, requireRole("admin"), deleteComment);
router.post("/:comment_id/upvote", verifyToken, upvoteComment);

export default router;
