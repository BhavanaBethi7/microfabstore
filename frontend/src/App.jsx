import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🌐 Pages
import LandingPage from "./pages/landingPage.jsx";
import ProductCatalogPage from "./pages/ProductCatalogPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Login from "./pages/SignIn.jsx";
import Register from "./pages/SignUp.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

// 🔒 Auth
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminUpload from "./components/AdminUploads.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🏠 Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<CategoryPage />} />

          <Route
            path="/category/:categorySlug"
            element={<ProductCatalogPage addToCart={addToCart} />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ PRODUCT DETAIL (ONLY ONCE) */}
          <Route
            path="/product/:productId"
            element={<ProductDetailPage addToCart={addToCart} />}
          />

          {/* 🔐 Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard cartItems={cartItems} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute>
                <AdminUpload />
              </ProtectedRoute>
            }
          />

          {/* ❌ 404 */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "20vh" }}>
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
