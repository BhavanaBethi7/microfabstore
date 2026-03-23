import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/NavBar";
import "./auth.css";


export default function SignUp() {
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
      try {
        setLoading(true);

        await registerUser({
          name: username,
          email,
          password,
        });

        alert("Account created successfully 🎉");
        navigate("/login");

      } catch (err) {
        console.log(err.response?.data);

        if (err.response?.status === 409) {
          setError("User already exists, Try login");
        } else {
          setError("Signup failed");
        }
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page-bg">
  <div className="auth-page">
    <div className="auth-card">
      <h2 className="auth-title">Sign Up</h2>

      <form className="auth-form-wrapper" onSubmit={handleSubmit}>
        <label className="auth-label">
          Email
          <input
            type="email"
            name="email"
            className="auth-input"
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
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>

        <label className="auth-label">
  Password
  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      className="auth-input"
      value={formData.password}
      onChange={handleChange}
      required
    />
    <span
      className="toggle-password"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? "🙈" : "👁️"}
    </span>
  </div>
</label>


        <label className="auth-label">
  Confirm Password
  <div className="password-wrapper">
    <input
      type={showConfirm ? "text" : "password"}
      name="confirmPassword"
      className="auth-input"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
    />
    <span
      className="toggle-password"
      onClick={() => setShowConfirm(!showConfirm)}
    >
      {showConfirm ? "🙈" : "👁️"}
    </span>
  </div>
</label>


        <button type="submit" className="auth-button">
          Create Account
        </button>
      </form>

      <div className="auth-bottom-text">
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Sign In
        </Link>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
