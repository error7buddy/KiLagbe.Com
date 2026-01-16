import mongoose from "mongoose";
import Advertisement from "../../models/Advertisement.js";
import multer from "multer";
import connectMongo from "../../config/mongo.js";

// ⛔ Important for Vercel file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Multer config (Vercel temp storage)
const storage = multer.diskStorage({
  destination: "/tmp",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Middleware runner
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  try {
    // 🔌 Connect MongoDB (shared connection)
    await connectMongo();

    // ---------- POST : Create new ad ----------
    if (req.method === "POST") {
      await runMiddleware(req, res, upload.array("images", 5));

      const { userId, title, description, bhk, houseNo, area, district, phone } = req.body;

      if (!userId || !title || !description) {
        return res.status(400).json({
          success: false,
          message: "User ID, title and description are required",
        });
      }

      const userAdsCount = await Advertisement.countDocuments({ userId });
      const FREE_AD_LIMIT = 2;

      if (userAdsCount >= FREE_AD_LIMIT) {
        return res.status(403).json({
          success: false,
          message: "Free ad limit reached",
        });
      }

      const images = req.files ? req.files.map((f) => f.filename) : [];

      const ad = new Advertisement({
        userId,
        title,
        description,
        bhk,
        address: { houseNo, area, district, phone },
        images,
      });

      await ad.save();

      return res.status(201).json({ success: true, ad });
    }

    // ---------- GET : Fetch ads ----------
    if (req.method === "GET") {
      if (req.query.userId) {
        const ads = await Advertisement.find({ userId: req.query.userId }).sort({ createdAt: -1 });
        return res.json(ads);
      }

      const ads = await Advertisement.find().sort({ createdAt: -1 });
      return res.json(ads);
    }

    // ---------- DELETE : Delete ad ----------
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: "Ad ID is required" });
      }

      const deleted = await Advertisement.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Ad not found" });
      }

      return res.json({ success: true });
    }

    // ---------- METHOD NOT ALLOWED ----------
    return res.status(405).json({ message: "Method Not Allowed" });

  } catch (err) {
    console.error("Ads API error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
