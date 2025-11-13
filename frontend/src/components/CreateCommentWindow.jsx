import React from "react";
import { createComment } from "../api/comment";

const CreateCommentWindow = async (report_id) => {
  try {
    const content = window.prompt("Enter comment content:");
    if (!content) return;

    await createComment(report_id, content);

    alert("Comment created successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error creating comment:", err);
    alert("Failed to create comment");
  }
};

export default CreateCommentWindow;
