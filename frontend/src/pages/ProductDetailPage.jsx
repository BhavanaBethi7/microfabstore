import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import API from "../api";
import { getImageUrl } from "../utils/image";
import "./ProductDetailPage.css";
import { useCart } from "../context/CartContext";
import { isLoggedIn } from "../utils/auth";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  /* =========================
     FETCH PRODUCT
  ========================= */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await API.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

 const handleAddToCart = async () => {
  if (!isLoggedIn()) {
    alert("Please login to add items to cart 🛒");
    navigate("/login", {
      state: { redirectTo: location.pathname },
    });
    return;
  }

  try {
    await addToCart(product._id, qty); // ✅ FIXED
    alert("Item added to cart ✅");
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  }
};

const handleBuyNow = async () => {
  if (!isLoggedIn()) {
    alert("Login required to continue");
    navigate("/login", {
      state: { redirectTo: location.pathname },
    });
    return;
  }

  await addToCart(product._id, qty); // ✅ FIXED
  navigate("/checkout");
};

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{
          textAlign: "center",
          padding: "100px 20px",
          color: "#d4af37",
          fontSize: "1.2rem"
        }}>
          Loading product details...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={{
          textAlign: "center",
          padding: "100px 20px",
          color: "#dc3545",
          fontSize: "1.2rem"
        }}>
          {error}
        </div>
      </>
    );
  }

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

          {product.brand && (
            <p className="brand">Brand: {product.brand}</p>
          )}

          <h2 className="price">₹{product.price}</h2>
          <p className="tax">Inclusive of all taxes</p>

          <p className="desc">{product.description}</p>

          {product.specifications && (
            <>
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specifications).map(([key, val]) => (
                  <li key={key}>
                    <strong>{key}:</strong> <span>{val}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* RIGHT: BUY BOX */}
        <div className="pd-buybox">
          <h2>₹{product.price}</h2>

          <p className={product.stock > 0 ? "instock" : "outstock"}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>

          <label>Quantity</label>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <button
            className="add-cart"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>

          <button
            className="buy-now"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >
            Buy Now
          </button>

          <p className="delivery">
            Delivery in 3–5 business days
          </p>
        </div>
      </div>
    </>
  );
}
