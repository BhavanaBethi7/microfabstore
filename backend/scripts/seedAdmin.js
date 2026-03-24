import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const adminData = {
  name: "Admin User",
  email: "admin@microfab.com",
  password: "admin123",
  role: "admin"
};

try {
  await mongoose.connect(process.env.MONGO_URI);

  // Check if admin already exists
  const existingAdmin = await User.findOne({ email: adminData.email });
  if (existingAdmin) {
    console.log("Admin user already exists");
    console.log("Email: admin@microfab.com");
    console.log("Password: admin123");
    process.exit(0);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminData.password, salt);

  // Create admin user
  await User.create({
    ...adminData,
    password: hashedPassword
  });

  console.log("Admin user created successfully!");
  console.log("Email: admin@microfab.com");
  console.log("Password: admin123");
  console.log("Role: admin");

} catch (error) {
  console.error("Error creating admin user:", error);
  process.exit(1);
}