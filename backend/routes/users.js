import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, email } = req.body;
    const existing = await User.findOne({ userId });
    if (existing) return res.json(existing);

    const newUser = new User({ userId, email });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});

export default router;
