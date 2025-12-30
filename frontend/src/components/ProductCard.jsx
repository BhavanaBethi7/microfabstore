// src/components/ProductCard.jsx
import React from "react";
import { getImageUrl } from "../utils/image";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function ProductCard({ product, addToCart }) {
  const imageUrl = product?.image
    ? `${API_BASE_URL}${product.image}`
    : "/placeholder.jpeg";

  return (
    <div className="product-card">
      <img
  src={getImageUrl(p.image)}
  alt={p.name}
  onError={(e) => (e.currentTarget.src = "/placeholder.jpeg")}
/>

      <h4>{product.name}</h4>
      <p>₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}
