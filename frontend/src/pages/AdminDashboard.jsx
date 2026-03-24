import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAuth();
    if (activeTab === "products") {
      fetchProducts();
    }
  }, [activeTab]);

  const checkAdminAuth = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.role || user.role !== "admin") {
      navigate("/admin/login");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <nav className="admin-nav">
        <button
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={activeTab === "categories" ? "active" : ""}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === "products" && (
          <ProductManagement products={products} loading={loading} onUpdate={fetchProducts} />
        )}
        {activeTab === "categories" && (
          <CategoryManagement />
        )}
        {activeTab === "orders" && (
          <OrderManagement />
        )}
      </main>
    </div>
  );
}

function ProductManagement({ products, loading, onUpdate }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-management">
      <div className="section-header">
        <h2>Product Management</h2>
        <button onClick={() => setShowAddForm(true)} className="add-btn">
          Add New Product
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={API.defaults.baseURL + product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">${product.price}</p>
              <p className="stock">Stock: {product.stock || 0}</p>
              <div className="product-actions">
                <button onClick={() => setEditingProduct(product)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <ProductForm
          onClose={() => setShowAddForm(false)}
          onSave={() => {
            setShowAddForm(false);
            onUpdate();
          }}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={() => {
            setEditingProduct(null);
            onUpdate();
          }}
        />
      )}
    </div>
  );
}

function ProductForm({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("category", formData.category);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("stock", formData.stock);
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      if (product) {
        await API.put(`/products/${product._id}`, submitData);
      } else {
        await API.post("/products/addWithImage", submitData);
      }

      onSave();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{product ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="substrates-wafers">Substrates & Wafers</option>
                <option value="metals-components">Metals & Components</option>
                <option value="chemicals-process-materials">Chemicals & Process Materials</option>
                <option value="cleanroom-safety-gear">Cleanroom & Safety Gear</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              required={!product}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CategoryManagement() {
  return (
    <div className="category-management">
      <h2>Category Management</h2>
      <p>Category management features coming soon...</p>
    </div>
  );
}

function OrderManagement() {
  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <p>Order management features coming soon...</p>
    </div>
  );
}

async function handleDelete(productId) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    await API.delete(`/products/${productId}`);
    window.location.reload(); // Simple refresh for now
  } catch (err) {
    alert("Failed to delete product");
  }
}