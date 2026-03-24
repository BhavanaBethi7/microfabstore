import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ ONLY THIS
import Navbar from "../components/NavBar";
import "./auth.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ correct usage
  const { login, loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED ✅");

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      console.log("LOGIN RESPONSE:", data);

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        login(data.token);

        setSuccessMessage("Login successful ✔ Redirecting to dashboard...");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);

      setTimeout(() => {
        navigate("/profile");
      }, 900);
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-page-bg">
        <div className="auth-card">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {error}
            </p>
          )}

          <Link to="/register">
            Don’t have an account? Sign Up
          </Link>
        </div>

        {successMessage && (
          <div className="auth-toast">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}