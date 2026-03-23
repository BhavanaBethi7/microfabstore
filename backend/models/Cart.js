import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ✅ one cart per user (VERY IMPORTANT)
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, // ✅ prevent empty product
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1, // ✅ prevent negative/zero
        },
      },
    ],
  },
  { timestamps: true } // ✅ optional but useful
);

export default mongoose.model("Cart", cartSchema);