import express from "express";
import ShiftingOrder from "../models/ShiftingOrder.js";

const router = express.Router();

// ✅ POST shifting order
router.post("/", async (req, res) => {
  try {
    const order = new ShiftingOrder(req.body);
    await order.save();
    res.status(201).json({ success: true, message: "Shifting order booked", order });
  } catch (err) {
    console.error("Shifting order error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ GET all shifting orders
router.get("/", async (req, res) => {
  try {
    const orders = await ShiftingOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ DELETE shifting order
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ShiftingOrder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ MARK COMPLETE
router.put("/:id/complete", async (req, res) => {
  try {
    const updated = await ShiftingOrder.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
