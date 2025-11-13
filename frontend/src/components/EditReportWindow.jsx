import React from "react";
import { editReport } from "../api/report";

const EditReportWindow = async ({
  report_id,
  title,
  description,
  photo_url,
  latitude,
  longitude,
}) => {
  try {
    if (!window.confirm("Edit this report?")) return;

    const newTitle = window.prompt("Enter new title:", title);
    const newDescription = window.prompt("Enter new description:", description);
    const newPhoto = window.prompt("Enter new photo URL:", photo_url);
    const newLatitude = parseFloat(
      window.prompt("Enter new latitude:", latitude),
    );
    const newLongitude = parseFloat(
      window.prompt("Enter new longitude:", longitude),
    );

    await editReport(
      report_id,
      newTitle,
      newDescription,
      newPhoto,
      Number(newLatitude),
      Number(newLongitude),
    );

    alert("Report updated successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error editing report:", err);
    alert("Failed to edit report");
  }
};
export default EditReportWindow;
