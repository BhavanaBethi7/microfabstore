import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";

export const addProductWithImage = async (req, res) => {
  try {
    const { name, category, description, price, inStock } = req.body;

    // Basic validation
    if (!name || !category || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // 🔥 Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "microfab/products",
        resource_type: "image",
      }
    );

    // Create product
    const product = await Product.create({
      name,
      category,
      description,
      price,
      inStock,
      image: uploadResult.secure_url, // ✅ Cloudinary URL
    });

    res.status(201).json({
      message: "Product uploaded successfully",
      product,
    });
  } catch (err) {
    console.error("❌ Product upload error:", err);
    res.status(500).json({ message: "Product upload failed" });
  }
};
