import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // 📦 FETCH CART (Only if logged in)
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCart([]); // Clear cart if no token
        return;
      }
      const res = await API.get("/cart");
      setCart(res.data || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCart([]); // Clear cart on error
    }
  };

  // 🔑 Check authentication status and fetch cart
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      setUser({ token }); // Set user as logged in
      fetchCart(); // Fetch their personalized cart
    } else {
      setUser(null);
      setCart([]); // Clear cart if not logged in
    }
  }, []);

  // 🔄 Refetch cart when user changes (via storage event)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setUser({ token });
        fetchCart();
      } else {
        setUser(null);
        setCart([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ➕ ADD (Only if logged in)
  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User must be logged in to add to cart");
      throw new Error("Not authenticated");
    }
    try {
      const res = await API.post("/cart/add", {
        productId,
        quantity,
      });

      setCart(res.data || []);
    } catch (err) {
      console.error("Add error:", err);
      throw err;
    }
  };

  // ❌ REMOVE (Only if logged in)
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User must be logged in");
      return;
    }
    try {
      const res = await API.delete(`/cart/remove/${productId}`);
      setCart(res.data || []);
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  // ➖ DECREASE (Only if logged in)
  const decreaseQty = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User must be logged in");
      return;
    }
    try {
      const res = await API.put(`/cart/decrease/${productId}`);
      setCart(res.data || []);
    } catch (err) {
      console.error("Decrease error:", err);
    }
  };

  // 🧹 CLEAR CART (Called on logout)
  const clearCart = () => {
    setCart([]);
    setUser(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        user,
        addToCart,
        removeFromCart,
        decreaseQty,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);