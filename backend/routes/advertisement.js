import express from "express";
import Advertisement from "../models/Advertisement.js";
import multer from "multer";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST ad
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { userId, title, description, bhk, houseNo, area, district, phone } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

    // Count **active ads** for this user
    const userAdsCount = await Advertisement.countDocuments({ userId });

    const FREE_AD_LIMIT = 2;
    if (userAdsCount >= FREE_AD_LIMIT) {
      return res.status(403).json({
        success: false,
        message: "You have reached your free ad limit. Please delete an existing ad to post a new one.",
      });
    }

    const images = req.files.map(f => f.filename);

    const ad = new Advertisement({
      userId,
      title,
      description,
      bhk,
      address: { houseNo, area, district, phone },
      images,
    });

    await ad.save();
    res.json({ success: true, ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ GET all ads
router.get("/", async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ads by user
router.get("/user/:userId", async (req, res) => {
  try {
    const ads = await Advertisement.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE ad
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Advertisement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Ad not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
