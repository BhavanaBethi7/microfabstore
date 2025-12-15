// src/pages/ProductCatalogPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/NavBar";
import API from "../services/api";

const ProductCatalogPage = ({ addToCart }) => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!categorySlug) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const encoded = encodeURIComponent(categorySlug);
        const res = await API.get(`/products/category/${encoded}`);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="catalog-container">
        <h2 className="category-title">
          {categorySlug ? categorySlug.replace(/-/g, " ") : "Products"}
        </h2>

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard key={p._id} product={p} addToCart={addToCart} />
            ))
          ) : (
            <p className="empty-text">
              No products available in this category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCatalogPage;
