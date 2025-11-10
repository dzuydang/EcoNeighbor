import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../api/auth";
import UserInfoCard from "../components/UserInfoCard";

const Home = () => {
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
        }
      } catch (error) {
        console.error("Login check failed:", error);
        setIsLoggedIn(false);
      }
    };

    verifyLogin();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[image:var(--background-home)] bg-cover bg-center bg-no-repeat">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="text-center max-w-2xl">
          {!isLoggedIn ? (
            <div className="mb-6">
              <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
                Protect your community.
              </h1>
              <h2 className="mt-3 text-lg sm:text-xl text-gray-600">
                Local neighborhood environmental reporting, made simple.
              </h2>
            </div>
          ) : (
            <div>
              <UserInfoCard />
            </div>
          )}
          {!isLoggedIn && (
            <div className="mt-8">
              <button
                onClick={() => nav("/auth")}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
