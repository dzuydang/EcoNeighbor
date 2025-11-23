import React from "react";
import { editWasteCenter } from "../api/wastecenter";

const EditWasteCenterWindow = async ({
  center_id,
  name,
  address,
  material_types,
  contact_info,
  latitude,
  longitude,
  about,
}) => {
  try {
    if (!window.confirm("Edit this waste center?")) return;

    const newName = window.prompt("Enter new name:", name);
    const newAddress = window.prompt("Enter new address:", address);
    const newMaterialTypes = window.prompt(
      "Enter new material types:",
      material_types,
    );
    const newContactInfo = window.prompt(
      "Enter new contact info:",
      contact_info,
    );
    const newLatitude = parseFloat(
      window.prompt("Enter new latitude:", latitude),
    );
    const newLongitude = parseFloat(
      window.prompt("Enter new longitude:", longitude),
    );
    const newAbout = window.prompt("Enter new about:", about);

    await editWasteCenter(
      center_id,
      newName,
      newAddress,
      newMaterialTypes,
      newContactInfo,
      Number(newLatitude),
      Number(newLongitude),
      newAbout,
    );

    alert("Waste center updated successfully!");
    window.location.reload();
  } catch (err) {
    console.error("Error editing waste center:", err);
    alert("Failed to edit waste center");
  }
};
export default EditWasteCenterWindow;
