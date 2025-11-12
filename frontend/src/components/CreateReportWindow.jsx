import React from "react";
import { createReport } from "../api/reports";

const CreateReportWindow = async () => {
  try {
    const title = window.prompt("Enter report title:");
    if (!title) return;

    const description = window.prompt("Enter description (optional):") || "";
    const photo_url = window.prompt("Enter photo URL (optional):") || "";
    const latitude = parseFloat(window.prompt("Enter latitude:") || 0);
    const longitude = parseFloat(window.prompt("Enter longitude:") || 0);

    await createReport(
      title,
      description,
      photo_url,
      Number(latitude),
      Number(longitude),
    );

    alert("Report created successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error creating report:", err);
    alert("Failed to create report");
  }
};

export default CreateReportWindow;
