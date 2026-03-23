import mongoose from "mongoose";
import Owner from "../models/Owner.js";
import dotenv from "dotenv";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);
  const owner = await Owner.findOne();
  if (owner) {
    console.log("Owner data found:");
    console.log(JSON.stringify(owner, null, 2));
  } else {
    console.log("No owner data found");
  }
  process.exit(0);
} catch (error) {
  console.error("Error:", error);
  process.exit(1);
}