import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/image";
import Navbar from "../components/NavBar";
import "./Cart.css";

const CartPage = () => {
  const { cart, removeFromCart, decreaseQty, addToCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // For now, show a message. Later we can implement proper checkout
    alert("Checkout functionality coming soon! Total: ₹" + totalAmount);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <a href="/categories" className="shop-now-btn">Shop Now</a>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.product._id} className="cart-item">
                  <img
                    src={getImageUrl(item.product.image)}
                    alt={item.product.name}
                    onError={(e) => (e.target.src = "/placeholder.jpeg")}
                  />

                  <div className="cart-info">
                    <h3>{item.product.name}</h3>
                    <p className="price">₹{item.product.price}</p>

                    <div className="qty">
                      <button
                        onClick={() => decreaseQty(item.product._id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item.product._id, 1)}>
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{totalAmount}</h3>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;