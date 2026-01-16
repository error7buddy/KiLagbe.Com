import ShiftingOrder from "../../models/ShiftingOrder.js";
import connectMongo from "../../config/mongo.js";

export default async function handler(req, res) {
  try {
    // 🔌 Connect MongoDB
    await connectMongo();

    // ---------- POST : Create order ----------
    if (req.method === "POST") {
      const order = new ShiftingOrder(req.body);
      await order.save();

      return res.status(201).json({
        success: true,
        message: "Shifting order booked",
        order,
      });
    }

    // ---------- GET : All orders ----------
    if (req.method === "GET") {
      const orders = await ShiftingOrder.find().sort({ createdAt: -1 });
      return res.json(orders);
    }

    // ---------- DELETE : Delete order ----------
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: "Order ID required" });
      }

      const deleted = await ShiftingOrder.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      return res.json({ success: true });
    }

    // ---------- PUT : Mark complete ----------
    if (req.method === "PUT") {
      const { id, action } = req.query;

      if (action !== "complete") {
        return res.status(400).json({ success: false, message: "Invalid action" });
      }

      const updated = await ShiftingOrder.findByIdAndUpdate(
        id,
        { status: "Completed" },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      return res.json({ success: true, order: updated });
    }

    // ---------- METHOD NOT ALLOWED ----------
    return res.status(405).json({ message: "Method Not Allowed" });

  } catch (err) {
    console.error("Shifting API error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
