import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔥 AUTO attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN SENT:", token); // DEBUG

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

export const addToCart = async (productId) => {
  const res = await API.post("/cart/add", { productId });
  return res.data;
};