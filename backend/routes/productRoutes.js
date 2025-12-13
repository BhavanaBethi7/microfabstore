import express from "express";
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Get current file and directory (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
// ──────────────────────────────────────────────
//   📦 GET ALL PRODUCTS OR FILTERED BY CATEGORY / SEARCH
// ──────────────────────────────────────────────
//
router.get("/", async (req, res) => {
  try {
    const { category, q, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: "i" };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(products);
  } catch (err) {
    console.error("GET / error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//
// ──────────────────────────────────────────────
//   📂 GET PRODUCTS BY CATEGORY PARAM
// ──────────────────────────────────────────────
//
router.get("/category/:categoryName", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName });
    res.json(products);
  } catch (err) {
    console.error("GET /category error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//
// ──────────────────────────────────────────────
//   🧩 BULK ADD PRODUCTS (ADMIN TESTING)
// ──────────────────────────────────────────────
//
router.post("/bulkAdd", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Please provide an array of products" });
    }

    const inserted = await Product.insertMany(products);
    res.status(201).json({
      message: `${inserted.length} products added successfully`,
      data: inserted,
    });
  } catch (err) {
    console.error("Bulk add error:", err);
    res.status(500).json({ message: "Server error during bulk add" });
  }
});

//
// ──────────────────────────────────────────────
//   🖼 MULTER CONFIGURATION FOR IMAGE UPLOAD
// ──────────────────────────────────────────────
//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (fileTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed!"));
    }
  },
});

//
// ──────────────────────────────────────────────
//   🆕 ADD PRODUCT WITH IMAGE UPLOAD
// ──────────────────────────────────────────────
//
router.post("/addWithImage", upload.single("image"), async (req, res) => {
  try {
    const { name, category, description, price, inStock } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: "Name, category, and price are required." });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const product = new Product({
      name,
      category,
      description,
      price,
      inStock: inStock ?? true,
      image: imageUrl,
    });

    const saved = await product.save();
    res.status(201).json({
      message: "Product added successfully",
      product: saved,
    });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
