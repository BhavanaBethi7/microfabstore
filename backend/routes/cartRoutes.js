import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ ADD TO CART
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.userId,
        items: [{ product: productId, quantity: quantity || 1 }],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += quantity || 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity || 1,
        });
      }

      await cart.save();
    }

    cart = await cart.populate("items.product");

    res.json(cart.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📦 GET CART
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId })
      .populate("items.product");

    if (!cart) return res.json([]);

    res.json(cart.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ❌ REMOVE
router.delete("/remove/:productId", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) return res.json([]);

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();

    cart = await cart.populate("items.product");

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ➖ DECREASE
router.put("/decrease/:productId", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) return res.json([]);

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId
    );

    if (item) {
      if (item.quantity > 1) item.quantity--;
      else {
        cart.items = cart.items.filter(
          (i) => i.product.toString() !== req.params.productId
        );
      }
    }

    await cart.save();

    cart = await cart.populate("items.product");

    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;