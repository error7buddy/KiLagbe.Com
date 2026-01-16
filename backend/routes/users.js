import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ POST create or fetch user
router.post("/", async (req, res) => {
  try {
    const { userId, email } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

    // Check if user already exists
    const existing = await User.findOne({ firebaseUid: userId });
    if (existing) return res.json({ success: true, user: existing });

    // Create new user
    const newUser = new User({ firebaseUid: userId, email });
    await newUser.save();
    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ success: false, message: "Error creating user", error: err.message });
  }
});

export default router;
