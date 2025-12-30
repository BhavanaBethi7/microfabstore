import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import API from "../api";
import "./ProductCatalogPage.css";
import { getImageUrl } from "../utils/image";

// Normalize category → URL-safe slug
const normalizeCategory = (str = "") =>
  str
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function ProductCatalogPage() {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");

        const allProducts = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        const filtered = allProducts.filter(
          (p) =>
            p?.category &&
            normalizeCategory(p.category) === categorySlug
        );

        if (isMounted) {
          setProducts(filtered);
        }
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [categorySlug]);

  return (
    <>
      <Navbar />

      <div className="page-content">
        <h1 className="category-title">
          {categorySlug
            ? categorySlug.replace(/-/g, " ").toUpperCase()
            : "PRODUCTS"}
        </h1>

        {loading && (
          <p className="status-text">Loading products...</p>
        )}

        {!loading && products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="product-card"
              >
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name || "Product image"}
                  className="product-image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpeg";
                  }}
                />

                <h3 className="product-name">
                  {product.name}
                </h3>

                <p className="product-price">
                  ₹{product.price}
                </p>
              </Link>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <p className="status-text">
            No products found for this category.
          </p>
        )}
      </div>
    </>
  );
}
