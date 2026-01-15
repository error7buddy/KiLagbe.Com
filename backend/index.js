import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import adRoutes from "./routes/advertisement.js";
import shiftingRoutes from "./routes/shifting.js";

dotenv.config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ---------- MONGO CONNECTION ---------- */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("✅ Backend running");
});

/* ---------- ROUTES ---------- */
app.use("/api/ads", adRoutes);
app.use("/api/shifting-orders", shiftingRoutes);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
