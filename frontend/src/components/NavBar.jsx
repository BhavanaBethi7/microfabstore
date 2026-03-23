import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.jpg";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();

  const totalItems = (cart || []).reduce(
  (sum, item) => sum + item.quantity,
  0
);

 const handleLogout = () => {
  logout();
  setMenuOpen(false);
  navigate("/login", { replace: true });
};

  return (
    <nav className="navbar">
      {/* 🌿 Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="MicroFabStore Logo" className="logo-img" />
        </Link>
      </div>

      {/* ☰ Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* 🧭 Center Links */}
      <div className={`navbar-center ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink to="/category/substrates-wafers" onClick={() => setMenuOpen(false)}>
              Substrates & Wafers
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/metals-components" onClick={() => setMenuOpen(false)}>
              Metals & Components
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/chemicals-process-materials" onClick={() => setMenuOpen(false)}>
              Chemicals & Process Materials
            </NavLink>
          </li>

          <li>
            <NavLink to="/category/cleanroom-safety-gear" onClick={() => setMenuOpen(false)}>
              Cleanroom & Safety Gear
            </NavLink>
          </li>

          {/* ✅ FIXED */}
          <li>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </NavLink>
          </li>
        </ul>

        {/* 👤 Mobile Auth */}
        <div className="navbar-right mobile-auth">
          {isAuthenticated ? (
            <>
              <button
                className="auth-btn"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                Profile
              </button>

              <button
                className="auth-btn filled"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="auth-btn"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="auth-btn filled"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🛒 Desktop Right */}
      <div className="navbar-right desktop-auth">
        {isAuthenticated && (
          <Link to="/cart" className="cart-icon">
          🛒
          {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
  </Link>
)}

        {isAuthenticated ? (
          <>
            <button
              className="auth-btn"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>

            <button
              className="auth-btn filled"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-btn">
              Sign In
            </Link>

            <Link to="/register" className="auth-btn filled">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
