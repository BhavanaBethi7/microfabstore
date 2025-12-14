import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthNavbar from "../components/AuthNavBar";
import "./auth.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (!email || !username || !password || !confirmPassword) {
      alert("⚠️ Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username, // ✅ backend expects `name`, not `username`
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert(`❌ ${data.msg || "Signup failed!"}`);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />
      <div className="auth-page-bg">
        <div className="auth-page">
          <div className="auth-card">
            <div className="auth-form-wrapper">
              <h2 className="auth-title">Sign Up</h2>

              <form onSubmit={handleSubmit}>
                <label className="auth-label">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="auth-input"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="auth-label">
                  Username
                  <input
                    type="text"
                    name="username"
                    className="auth-input"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="auth-label">
                  Password
                  <input
                    type="password"
                    name="password"
                    className="auth-input"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="auth-label">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    className="auth-input"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="auth-button"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="auth-bottom-text">
                Already have an account?&nbsp;
                <Link to="/login" className="auth-link">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
