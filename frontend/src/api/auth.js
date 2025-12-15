// src/services/authService.js
import API from "./api";

// 📝 Register
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// 🔐 Login
export const loginUser = async (userData) => {
  try {
    const res = await API.post("/auth/login", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// 🚪 Logout (FRONTEND ONLY)
export const logoutUser = () => {
  localStorage.removeItem("token");
};
