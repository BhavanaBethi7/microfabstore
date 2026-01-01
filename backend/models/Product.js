import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  brand: { type: String, default: "MicroFab" },
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  specifications: {
    type: Object,
    default: {}
  }
});


export default mongoose.model("Product", productSchema);
