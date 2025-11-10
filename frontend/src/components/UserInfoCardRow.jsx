import React from "react";

const UserInfoCardRow = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-600 pb-2">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm text-gray-800">{value || "—"}</span>
    </div>
  );
};

export default UserInfoCardRow;
