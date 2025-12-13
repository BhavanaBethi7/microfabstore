import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!user) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.name} 👋</h1>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </header>

      <section className="dashboard-section">
        <h2>🛒 My Orders</h2>
        {user.orders?.length ? (
          <div className="dashboard-cards">
            {user.orders.map((order) => (
              <div className="dashboard-card" key={order._id}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">No orders yet.</p>
        )}
      </section>

      <section className="dashboard-section">
        <h2>❤️ Wishlist</h2>
        {user.wishlist?.length ? (
          <div className="dashboard-cards">
            {user.wishlist.map((item) => (
              <div className="dashboard-card" key={item._id}>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">Your wishlist is empty.</p>
        )}
      </section>

      <section className="dashboard-section">
        <h2>👀 Recently Viewed</h2>
        {user.recentlyViewed?.length ? (
          <div className="dashboard-cards">
            {user.recentlyViewed.map((item) => (
              <div className="dashboard-card" key={item._id}>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">No recently viewed items.</p>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
