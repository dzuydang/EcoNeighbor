import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-bold text-green-700">EcoNeighbor</div>

      {/* Nav Bar Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link to="/" className="hover:text-green-600 transition-colors">
          Home
        </Link>
        <Link
          to="/dashboard"
          className="hover:text-green-600 transition-colors"
        >
          Dashboard
        </Link>
        <Link to="/reports" className="hover:text-green-600 transition-colors">
          Reports
        </Link>
        <Link to="/alerts" className="hover:text-green-600 transition-colors">
          Alerts
        </Link>
      </div>

      {/* Login button */}
      <div>
        <button
          className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-sm transition-transform hover:scale-105"
          onClick={() => navigate("/auth")}
        >
          Log In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
