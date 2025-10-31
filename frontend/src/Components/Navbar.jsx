import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-logo">EcoNeighbor</div>
            <div className={`nav-links ${isOpen ? "open" : ""}`}>
                <a href="#home">Home</a>
                <a href="#about">Dashboard</a>
                <a href="#services">Reports</a>
                <a href="#contact">Alerts</a>
            </div>
            <div className="log-in">
                <button>Log In</button>
            </div>
        </nav>
    );
};

export default Navbar;