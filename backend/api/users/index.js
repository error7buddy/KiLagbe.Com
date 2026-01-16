import User from "../../models/User.js";
import connectMongo from "../../config/mongo.js";

export default async function handler(req, res) {
  try {
    // 🔌 Connect MongoDB
    await connectMongo();

    // ---------- POST : Create or fetch user ----------
    if (req.method === "POST") {
      const { userId, email } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      // Check if user already exists
      const existing = await User.findOne({ firebaseUid: userId });

      if (existing) {
        return res.json({ success: true, user: existing });
      }

      // Create new user
      const newUser = new User({
        firebaseUid: userId,
        email,
      });

      await newUser.save();

      return res.json({ success: true, user: newUser });
    }

    // ---------- METHOD NOT ALLOWED ----------
    return res.status(405).json({ message: "Method Not Allowed" });

  } catch (err) {
    console.error("User API error:", err);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
}
