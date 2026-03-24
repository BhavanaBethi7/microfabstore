import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);
  const admin = await User.findOne({ email: "admin@microfab.com" });
  if (admin) {
    console.log("Admin user found:");
    console.log(JSON.stringify({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt
    }, null, 2));
  } else {
    console.log("Admin user not found");
  }
  process.exit(0);
} catch (error) {
  console.error("Error:", error);
  process.exit(1);
}