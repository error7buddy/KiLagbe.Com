import ShiftingOrder from "../../models/ShiftingOrder.js";
import connectMongo from "../../config/mongo.js";

const allowedOrigins = [
  "https://ki-lagbe-com.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

function setCors(res, origin) {
  if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://ki-lagbe-com.vercel.app");
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  setCors(res, origin);

  // ✅ Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectMongo();

    // ✅ POST: create shifting order
    if (req.method === "POST") {
      const order = new ShiftingOrder(req.body);
      await order.save();

      return res.status(201).json({
        success: true,
        message: "Shifting order booked",
        order,
      });
    }

    // ✅ GET: all shifting orders
    if (req.method === "GET") {
      const orders = await ShiftingOrder.find().sort({ createdAt: -1 });
      return res.status(200).json(orders);
    }

    // ✅ DELETE: expects ?id=
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: "Order ID required" });
      }

      const deleted = await ShiftingOrder.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      return res.status(200).json({ success: true });
    }

    // ✅ PUT: complete order expects ?id= & action=complete
    if (req.method === "PUT") {
      const { id, action } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: "Order ID required" });
      }

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

      return res.status(200).json({ success: true, order: updated });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error("Shifting API error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
