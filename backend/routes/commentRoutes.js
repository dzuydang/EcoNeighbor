import express from "express";
import {
  createComment,
  getCommentsByReport,
  updateComment,
  deleteComment,
  upvoteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);
router.get("/:report_id", getCommentsByReport);
router.put("/:comment_id", updateComment);
router.delete("/:comment_id", deleteComment);
router.post("/:comment_id/upvote", upvoteComment);

export default router;
