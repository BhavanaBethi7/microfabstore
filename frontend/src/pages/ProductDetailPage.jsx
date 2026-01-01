import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import API from "../api";
import { getImageUrl } from "../utils/image";
import "./ProductDetailPage.css";

export default function ProductDetailPage({ addToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/${productId}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <>
      <Navbar />

      <div className="product-detail-page">
        {/* LEFT: IMAGE */}
        <div className="pd-image">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
          />
        </div>

        {/* CENTER: INFO */}
        <div className="pd-info">
          <h1>{product.name}</h1>
          <p className="brand">Brand: {product.brand}</p>

          <h2 className="price">₹{product.price}</h2>
          <p className="tax">Inclusive of all taxes</p>

          <p className="desc">{product.description}</p>

          <h3>Specifications</h3>
          <ul>
            {product.specifications &&
              Object.entries(product.specifications).map(([key, val]) => (
                <li key={key}>
                  <strong>{key}:</strong> {val}
                </li>
              ))}
          </ul>
        </div>

        {/* RIGHT: BUY BOX */}
        <div className="pd-buybox">
          <h2>₹{product.price}</h2>

          <p className={product.stock > 0 ? "instock" : "outstock"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <label>Quantity</label>
          <select value={qty} onChange={(e) => setQty(+e.target.value)}>
            {[...Array(5)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>

          <button
            className="add-cart"
            onClick={() => addToCart({ ...product, quantity: qty })}
          >
            Add to Cart
          </button>

          <button className="buy-now">Buy Now</button>

          <p className="delivery">
            Delivery in 3–5 business days
          </p>
        </div>
      </div>
    </>
  );
}
