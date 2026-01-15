import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/upgrade", async (req, res) => {
  const { user_id } = req.body;

  await User.findOneAndUpdate(
    { user_id },
    { is_premium: true, ads_left: 999 },
    { upsert: true }
  );

  res.json({ success: true });
});

export default router;
