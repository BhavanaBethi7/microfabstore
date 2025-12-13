import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.msg || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
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
        <a href="/signup" style={{ color: "#f5b500" }}>
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;
