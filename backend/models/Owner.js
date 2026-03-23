import { Schema, model } from "mongoose";

const ownerSchema = new Schema(
  {
    storeName: String,
    ownerName: String,
    email: String,
    phone: String,
    address: String,
  },
  { timestamps: true }
);

export default model("Owner", ownerSchema);
