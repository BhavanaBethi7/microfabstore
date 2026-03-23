import mongoose from "mongoose";
import Owner from "../models/Owner.js";
import dotenv from "dotenv";

dotenv.config();

const ownerData = {
  storeName: "Micro and Nano Fabrications",
  ownerName: "Suneetha T",
  email: "m&nfabrications@gmail.com",
  phone: "7506896766",
  address: "Flat no C-408, Block- C, Shweta Shubham, Jaibery Colony, Kompally, Hyderabad- 500100",
  about: "Micro and Nano Fabrications is your premier destination for high-quality microfabrication materials and equipment. We specialize in substrates, wafers, metals, components, chemicals, and cleanroom supplies for research and industrial applications. With years of experience in the semiconductor and microelectronics industry, we provide reliable products and expert support to help you achieve your fabrication goals."
};

try {
  await mongoose.connect(process.env.MONGO_URI);
  const owner = await Owner.findOne();
  if (owner) {
    await Owner.updateOne({ _id: owner._id }, ownerData);
    console.log("Owner record updated successfully");
  } else {
    await Owner.create(ownerData);
    console.log("Owner record created successfully");
  }
  process.exit(0);
} catch (error) {
  console.error("Error updating owner:", error);
  process.exit(1);
}
