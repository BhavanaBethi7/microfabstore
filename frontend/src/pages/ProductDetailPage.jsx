import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import API from "../api";
import "./ProductDetailPage.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductDetailPage({ addToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
          <div className="product-image-wrapper">
            <img
              src={`${API_BASE_URL}/${product.image}`}
              alt={product.name}
              onError={(e) => (e.target.src = "/placeholder.png")}
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">₹{product.price}</p>
            <p className="product-description">{product.description}</p>

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
