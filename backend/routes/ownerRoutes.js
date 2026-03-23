import express from "express";
import Owner from "../models/Owner.js";

const router = express.Router();

// GET owner details (only one owner exists)
router.get("/", async (req, res) => {
  try {
    const owner = await Owner.findOne();
    res.json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
