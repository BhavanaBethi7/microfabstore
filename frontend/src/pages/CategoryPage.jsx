import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import "./ProductCatalogPage.css";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log("All products from API:", data);

        // ✅ Filter products matching the current category
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
    }
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
                {/* ✅ Fixed image display */}
                <img
                  src={`http://localhost:5000/${p.image}`}
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
