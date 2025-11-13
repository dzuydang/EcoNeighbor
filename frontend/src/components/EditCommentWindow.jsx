import React from "react";
import { editComment } from "../api/comment";

const EditCommentWindow = async (comment_id, content) => {
  try {
    if (!window.confirm("Edit this comment?")) return;

    const newContent = window.prompt("Enter comment content:", content);
    if (!content) return;

    await editComment(comment_id, newContent);

    alert("Comment updated  successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error editing comment:", err);
    alert("Failed to edit comment");
  }
};

export default EditCommentWindow;
