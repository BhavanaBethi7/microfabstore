import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ============================
   📦 GET ALL PRODUCTS
============================ */
router.get("/", async (req, res) => {
  try {
    const { category, q, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: "i" };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================
   📂 GET PRODUCTS BY CATEGORY
============================ */
router.get("/category/:categoryName", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryName,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ============================
   🔍 GET PRODUCT BY ID  ✅ THIS FIXES YOUR ISSUE
============================ */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Invalid product ID" });
  }
});

/* ============================
   🧩 BULK ADD
============================ */
router.post("/bulkAdd", async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid product array" });
    }

    const inserted = await Product.insertMany(products);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ message: "Bulk insert failed" });
  }
});

/* ============================
   🆕 ADD PRODUCT WITH IMAGE
============================ */
router.post("/addWithImage", upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    if (!name || !category || !price || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const product = await Product.create({
      name,
      category,
      description,
      price: Number(price),
      image: imagePath,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
