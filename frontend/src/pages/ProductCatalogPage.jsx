// src/pages/ProductCatalogPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import API from "../api";
import "./ProductCatalogPage.css";

// 🔧 Normalize category → URL-safe slug
const normalizeCategory = (str = "") =>
  str
    .toLowerCase()
    .replace(/&/g, "")            // remove &
    .replace(/[^a-z0-9]+/g, "-")  // replace spaces & symbols with -
    .replace(/^-|-$/g, "");       // trim leading/trailing -

export default function ProductCatalogPage() {
  const { categorySlug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        // 🔒 Ensure we always work with an array
        const allProducts = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        console.log("ALL PRODUCTS:", allProducts);

        // 🔍 Debug category matching
        allProducts.forEach((p) => {
          console.log(
            "DB:", p.category,
            "→", normalizeCategory(p.category),
            "| URL:", categorySlug
          );
        });

        const filtered = allProducts.filter(
          (p) =>
            p.category &&
            normalizeCategory(p.category) === categorySlug
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

      <div className="page-content">
        {/* Category Title */}
        <h1 className="category-title">
          {categorySlug.replace(/-/g, " ").toUpperCase()}
        </h1>

        {/* Loading */}
        {loading && (
          <p className="status-text">Loading products...</p>
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="product-card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  onError={(e) =>
                    (e.target.src = "/placeholder.png")
                  }
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <p className="status-text">
            No products found for this category.
          </p>
        )}
      </div>
    </>
  );
}
