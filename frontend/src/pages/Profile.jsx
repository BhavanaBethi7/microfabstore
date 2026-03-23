import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { getProfile } from "../services/userService";
import { getMyOrders } from "../services/orderService";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getProfile();
        const orderData = await getMyOrders();

        setUser(userData);
        setOrders(orderData);
      } catch (err) {
        console.error("Profile load error:", err);

        // 🔥 If token invalid → redirect to login
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-processing';
    }
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <h2>Loading profile...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-container">
        {/* 👤 USER INFO */}
        <div className="profile-header">
          <h2>Welcome, {user?.name || "User"}</h2>
          <p>{user?.email}</p>
        </div>

        {/* 🧾 ORDERS */}
        <div className="profile-section">
          <h3>Your Orders</h3>

          {orders.length === 0 ? (
            <div className="empty-state">
              <p>No orders yet 🛒</p>
              <p>Start shopping to see your order history here!</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-card">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Status:</strong> <span className={`order-status ${getStatusClass(order.status)}`}>{order.status || "Processing"}</span></p>
                <p><strong>Date:</strong> {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>

        {/* ❤️ WISHLIST */}
        {user?.wishlist?.length > 0 && (
          <div className="profile-section">
            <h3>Wishlist</h3>
            <div className="wishlist-grid">
              {user.wishlist.map((item) => (
                <div key={item._id} className="wishlist-item">
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 👀 RECENTLY VIEWED */}
        {user?.recentlyViewed?.length > 0 && (
          <div className="profile-section">
            <h3>Recently Viewed</h3>
            <div className="recently-viewed-grid">
              {user.recentlyViewed.map((item) => (
                <div key={item._id} className="recently-viewed-item">
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}