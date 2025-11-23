import { query } from "../config/db.js";

export const createComment = async (req, res) => {
  try {
    const { id } = req.user;
    const { report_id, content } = req.body;

    if (!report_id || !id || !content) {
      return res
        .status(400)
        .json({ error: "report_id, user_id, and content are required" });
    }

    const result = await query(
      `INSERT INTO comments (report_id, user_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [report_id, id, content],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

export const getCommentsByReport = async (req, res) => {
  try {
    const { report_id } = req.params;
    const result = await query(
      `SELECT c.*, u.full_name AS author_name
       FROM comments c
       JOIN users u ON c.user_id = u.user_id
       WHERE c.report_id = $1
       ORDER BY c.created_at DESC`,
      [report_id],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Error getting comments" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "content cannot be empty" });
    }

    const result = await query(
      `UPDATE comments
       SET content = $1
       WHERE comment_id = $2
       RETURNING *`,
      [content, comment_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Error updating comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const result = await query(
      "DELETE FROM comments WHERE comment_id = $1 RETURNING *",
      [comment_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment" });
  }
};

export const upvoteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const result = await query(
      `UPDATE comments
       SET upvotes = upvotes + 1
       WHERE comment_id = $1
       RETURNING *`,
      [comment_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error upvoting comment:", error);
    res.status(500).json({ error: "Error upvoting comment" });
  }
};
