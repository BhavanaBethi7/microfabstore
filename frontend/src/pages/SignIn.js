import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthNavbar from "../components/AuthNavBar";
import "./auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        // ✅ Save token
        localStorage.setItem("token", res.data.token);

        // ✅ Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <AuthNavbar />
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
