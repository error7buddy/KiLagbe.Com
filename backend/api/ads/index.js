import Advertisement from "../../models/Advertisement.js";
import connectMongo from "../../config/mongo.js";

export default async function handler(req, res) {
  try {
    await connectMongo();

    // ✅ POST (JSON only)
    if (req.method === "POST") {
      const {
        userId,
        title,
        description,
        bhk,
        houseNo,
        area,
        district,
        phone,
        images,
      } = req.body || {};

      if (!userId || !title || !description) {
        return res.status(400).json({
          success: false,
          message: "User ID, title and description are required",
        });
      }

      // Free ad limit check
      const userAdsCount = await Advertisement.countDocuments({ userId });
      const FREE_AD_LIMIT = 2;

      if (userAdsCount >= FREE_AD_LIMIT) {
        return res.status(403).json({
          success: false,
          message: "Free ad limit reached",
        });
      }

      const ad = new Advertisement({
        userId,
        title,
        description,
        bhk,
        address: { houseNo, area, district, phone },
        images: Array.isArray(images) ? images : [],
      });

      await ad.save();
      return res.status(201).json({ success: true, ad });
    }

    // ✅ GET
    if (req.method === "GET") {
      if (req.query.userId) {
        const ads = await Advertisement.find({ userId: req.query.userId }).sort({
          createdAt: -1,
        });
        return res.status(200).json(ads);
      }

      const ads = await Advertisement.find().sort({ createdAt: -1 });
      return res.status(200).json(ads);
    }

    // ✅ DELETE (expects ?id=)
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: "Ad ID required" });
      }

      const deleted = await Advertisement.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Ad not found" });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error("Ads API error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
