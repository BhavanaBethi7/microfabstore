import API from "../api";

/**
 * =========================
 * REGISTER USER
 * =========================
 * payload: { name, email, password }
 */
export const registerUser = async (payload) => {
  try {
    const res = await API.post("/auth/signup", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Signup failed. Please try again.",
    };
  }
};

/**
 * =========================
 * LOGIN USER
 * =========================
 * payload: { email, password }
 */
export const loginUser = async (payload) => {
  try {
    const res = await API.post("/auth/login", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || {
      message: "Login failed. Invalid credentials.",
    };
  }
};
