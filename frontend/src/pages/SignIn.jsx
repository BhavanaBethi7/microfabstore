// src/pages/SignIn.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavBar";
//import { loginUser } from "../services/authService";//
import { AuthContext } from "../context/AuthContext";
import "./auth.css";
import Navbar from "../components/NavBar";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });

      // ✅ update global auth state
      login(data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <>
    <Navbar />
      

      <div className="auth-page-bg">
        <div className="auth-page">
          <div className="auth-card">
            <div className="auth-form-wrapper">
              <h2 className="auth-title">Sign In</h2>

              <form onSubmit={handleSubmit}>
                <label className="auth-label">
                  Email Address
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="auth-label">
                  Password
                  <input
                    type="password"
                    className="auth-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>

                <button type="submit" className="auth-button">
                  Sign In
                </button>
              </form>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="auth-bottom-text">
                Don’t have an account?&nbsp;
                <Link to="/register" className="auth-link">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
