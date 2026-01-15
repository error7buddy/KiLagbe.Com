import express from "express";
import ShiftingOrder from "../models/ShiftingOrder.js";

const router = express.Router();

// ✅ POST shifting order
router.post("/", async (req, res) => {
  try {
    const order = new ShiftingOrder(req.body);
    await order.save();

    res.json({
      success: true,
      message: "Shifting order booked successfully",
      order,
    });
  } catch (err) {
    console.error("Shifting order error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET all shifting orders (admin use)
router.get("/", async (req, res) => {
  try {
    const orders = await ShiftingOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
