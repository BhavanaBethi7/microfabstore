// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import API from "../api";
import "./ProductCatalogPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const data = res.data;

        const filtered = data.filter(
          (p) =>
            p.category?.toLowerCase().replace(/\s+/g, "-") ===
            categorySlug.toLowerCase()
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  return (
    <>
      <Navbar />

      <div className="category-detail-page">
        <h1 className="category-title">
          {categorySlug.replace(/-/g, " ").toUpperCase()}
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((p) => (
              <div key={p._id} className="product-card">
                <img
                  src={`${API_BASE_URL}/${p.image}`}
                  alt={p.name}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </>
  );
}
