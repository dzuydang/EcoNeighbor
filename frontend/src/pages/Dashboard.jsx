import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../api/auth";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const data = await checkLogin();
        if (data === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          nav("/auth", { replace: true });
        }
      } catch (error) {
        console.error("Login check failed:", error);
        setIsLoggedIn(false);
        nav("/auth", { replace: true });
      }
    };

    verifyLogin();
  }, [nav]);
  return (
    <div className="min-h-screen flex flex-col bg-[image:var(--background-home)] bg-cover bg-center bg-no-repeat">
      <Navbar />
    </div>
  );
};

export default Dashboard;
