import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import API from "../api";
import "./ProductDetailPage.css";
import { getImageUrl } from "../utils/image";

export default function ProductDetailPage({ addToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${productId}`);

        if (isMounted) {
          setProduct(res.data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch product:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="status-text">Loading product...</p>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="status-text">Product not found.</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="page-content product-detail-page">
        <div className="product-detail-container">

          {/* ✅ IMAGE (Cloudinary + backend safe) */}
          <div className="product-image-wrapper">
            <img
              src={getImageUrl(product.image)}
              alt={product.name || "Product image"}
              className="detail-image"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpeg";
              }}
            />
          </div>

          {/* ✅ PRODUCT INFO */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>

            <p className="product-price">
              ₹{product.price}
            </p>

            <p className="product-description">
              {product.description || "No description available."}
            </p>

            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
