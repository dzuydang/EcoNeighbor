import React from "react";
import { createWasteCenter } from "../api/wastecenter";

const CreateWasteCenterWindow = async () => {
  try {
    const name = window.prompt("Enter name:") || "";
    if (!name) return;
    const address = window.prompt("Enter address:") || "";
    const material_types = window.prompt("Enter material types:") || "";
    const contact_info = window.prompt("Enter contact information:") || "";
    const latitude = parseFloat(window.prompt("Enter latitude:") || 0);
    const longitude = parseFloat(window.prompt("Enter longitude:") || 0);
    const about = window.prompt("Enter about:") || "";

    await createWasteCenter(
      name,
      address,
      material_types,
      contact_info,
      Number(latitude),
      Number(longitude),
      about,
    );

    console.log(about);

    alert("Waste center created successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error creating waste center:", err);
    alert("Failed to create waste center");
  }
};

export default CreateWasteCenterWindow;
