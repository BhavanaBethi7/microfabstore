import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/NavBar";

const ProductCatalogPage = ({ addToCart }) => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categorySlug) return; // ✅ prevent fetch before slug loads
      setLoading(true);
      setError("");
      try {
        const encoded = encodeURIComponent(categorySlug);
        const res = await axios.get(
          `http://localhost:5000/api/products/category/${encoded}`
        );

        // ✅ Normalize image URLs
        const updated = res.data.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image
            : `http://localhost:5000/${p.image}`,
        }));

        setProducts(updated);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  if (loading)
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );

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
            <p className="empty-text">No products available in this category.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCatalogPage;
