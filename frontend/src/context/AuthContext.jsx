import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api"; // 🔥 use your axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔁 Load user from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser({ token });
    }
  }, []);

  // 🔐 LOGIN
  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // Note: CartContext.clearCart() will be called from NavBar or wherever logout is triggered
  };

  // 📝 REGISTER USER
  const registerUser = async (payload) => {
    try {
      const res = await API.post("/auth/signup", payload);
      return res.data;
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  };

  // 🔑 LOGIN USER
  const loginUser = async (payload) => {
    try {
      const res = await API.post("/auth/login", payload);
      return res.data;
    } catch (err) {
      console.error("Login API error:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerUser,
        loginUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Custom hook
export const useAuth = () => useContext(AuthContext);