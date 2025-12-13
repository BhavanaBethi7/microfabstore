import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🌐 Pages
import LandingPage from "./pages/landingPage";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import CategoryPage from "./pages/CategoryPage"; // ✅ renamed for clarity
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/SignIn";
import Register from "./pages/SignUp";
import ProductUploadForm from "./pages/ProductUploadForm";
import AdminUpload from "./components/AdminUploads";
// 🔒 Auth Context & Protected Route
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // 🛒 Add product to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🏠 Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* 🧭 Category & Product Pages */}
          <Route path="/categories" element={<CategoryPage />} />
          <Route
            path="/category/:categorySlug"
            element={<ProductCatalogPage addToCart={addToCart} />}
          />

          {/* 👤 Protected User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard cartItems={cartItems} />
              </ProtectedRoute>
            }
          />
            <Route path="/admin/add-product" element={<AdminUpload />} />
          {/* 🔐 Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/admin/add-product" element={<ProductUploadForm />} />
          {/* ❌ Catch-all 404 */}
          <Route
            path="*"
            element={
              <div
                style={{
                  textAlign: "center",
                  color: "gold",
                  marginTop: "20vh",
                  fontSize: "1.5rem",
                }}
              >
                404 — Page Not Found
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
