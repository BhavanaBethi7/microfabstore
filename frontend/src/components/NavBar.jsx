import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* 🌿 Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="MicroFabStore Logo" className="logo-img" />
        </Link>
      </div>

      {/* ☰ Hamburger (mobile only) */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {/* 🧭 Center: Category Links */}
      <div className={`navbar-center ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/category/substrates-wafers"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Substrates & Wafers
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category/metals-components"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Metals & Components
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category/chemicals-process-materials"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Chemicals & Process Materials
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category/cleanroom-safety-gear"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Cleanroom & Safety Gear
            </NavLink>
          </li>
        </ul>

        {/* 👤 Auth buttons inside menu (mobile-friendly) */}
        <div className="navbar-right mobile-auth">
          <Link to="/login" className="auth-btn" onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
          <Link
            to="/register"
            className="auth-btn filled"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* 👤 Right: Auth buttons (desktop only) */}
      <div className="navbar-right desktop-auth">
        <Link to="/login" className="auth-btn">
          Sign In
        </Link>
        <Link to="/register" className="auth-btn filled">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
