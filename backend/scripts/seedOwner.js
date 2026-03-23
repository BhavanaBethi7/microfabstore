import mongoose from "mongoose";
import Owner from "../models/Owner.js";
import dotenv from "dotenv";

dotenv.config();

const ownerData = {
  storeName: "MicroFab Store",
  ownerName: "John Doe",
  email: "contact@microfabstore.com",
  phone: "+1 (555) 123-4567",
  address: "123 Tech Street, Silicon Valley, CA 94043",
  about: "MicroFab Store is your premier destination for high-quality microfabrication materials and equipment. We specialize in substrates, wafers, metals, components, chemicals, and cleanroom supplies for research and industrial applications. With years of experience in the semiconductor and microelectronics industry, we provide reliable products and expert support to help you achieve your fabrication goals."
};

await mongoose.connect(process.env.MONGO_URI);

// Check if owner already exists
const existingOwner = await Owner.findOne();
if (existingOwner) {
  console.log("Owner data already exists");
  process.exit(0);
}

// Create owner
await Owner.create(ownerData);
console.log("Seeded owner data");
process.exit(0);