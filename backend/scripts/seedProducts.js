import mongoose from "mongoose";
import Product from "../models/Product.js";
import products from "./sampleProducts.json"; // array of product objects

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany({});
await Product.insertMany(products);
console.log("Seeded products");
process.exit(0);
