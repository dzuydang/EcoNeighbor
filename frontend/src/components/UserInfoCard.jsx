import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getUserbyID } from "../api/user";
import UserInfoCardRow from "./UserInfoCardRow";

const UserInfoCard = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      try {
        const data = await getUserbyID();
        setUserName(data.full_name);
        setEmail(data.email);
        setRole(data.role);
        setLocation(data.location);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    getUserInfo();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg shadow-xl rounded-2xl p-8 border border-green-100 bg-gradient-to-br from-green-50 to-emerald-100"
      >
        <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
          Welcome{userName ? `, ${userName}` : ""}!
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Here’s your account information:
        </p>

        <div className="space-y-4">
          <UserInfoCardRow label="Email" value={email} />
          <UserInfoCardRow label="Role" value={role} />
          <UserInfoCardRow label="Location" value={location} />
        </div>
      </motion.div>
    </div>
  );
};

export default UserInfoCard;
