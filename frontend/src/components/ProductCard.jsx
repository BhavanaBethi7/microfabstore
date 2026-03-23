// src/components/ProductCard.jsx
import React from "react";
import { getImageUrl } from "../utils/image";

export default function ProductCard({ product, addToCart }) {
  const imageUrl = getImageUrl(product?.image);

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt={product.name}
        onError={(e) => (e.currentTarget.src = "/placeholder.jpeg")}
      />

      <h4>{product.name}</h4>
      <p>₹{product.price}</p>

      <button
        onClick={(e) => {
          e.preventDefault(); // stops link navigation
          addToCart(product._id, 1);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
