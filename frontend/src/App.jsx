import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/landingPage.jsx";
import ProductCatalogPage from "./pages/ProductCatalogPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Login from "./pages/SignIn.jsx";
import Register from "./pages/SignUp.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Auth
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminUpload from "./components/AdminUploads.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/category/:categorySlug"
        element={<ProductCatalogPage />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/product/:productId"
        element={<ProductDetailPage />}
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
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

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", marginTop: "20vh" }}>
            404 — Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

export default App;