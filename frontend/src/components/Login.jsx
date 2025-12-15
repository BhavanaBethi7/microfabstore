// src/pages/SignIn.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { loginUser } from "../services/authService";//
import { AuthContext } from "../context/AuthContext";

const Login = () => {
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

      // update global auth state
      login(data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don’t have an account?{" "}
        <Link to="/signup" style={{ color: "#f5b500" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
