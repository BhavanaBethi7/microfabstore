// src/components/ProductCard.jsx
import React from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img
        src={`${API_BASE_URL}/${product.image}`}
        alt={product.name}
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />

      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
}
