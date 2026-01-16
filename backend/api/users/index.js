import User from "../../models/User.js";
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
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
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

    // ✅ POST: create or fetch user
    if (req.method === "POST") {
      const { userId, email } = req.body || {};

      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }

      const existing = await User.findOne({ firebaseUid: userId });
      if (existing) {
        return res.status(200).json({ success: true, user: existing });
      }

      const newUser = new User({ firebaseUid: userId, email });
      await newUser.save();

      return res.status(201).json({ success: true, user: newUser });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error("Users API error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
