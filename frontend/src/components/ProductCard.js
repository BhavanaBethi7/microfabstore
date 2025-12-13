import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img 
  src={`http://localhost:5000/${product.image}`} 
  alt={product.name} 
  style={{ width: "200px", height: "200px" }}
/>

      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
}
