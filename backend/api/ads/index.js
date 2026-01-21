import Advertisement from "../../models/Advertisement.js";
import connectMongo from "../../config/mongo.js";

// ✅ Allowed origins
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
  // ✅ ADD PUT here
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
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

    // ✅ GET (all ads, user ads, or single ad by id)
    if (req.method === "GET") {
      const { userId, id } = req.query;

      // ✅ Single ad (for edit page)
      if (id) {
        const ad = await Advertisement.findById(id);
        if (!ad) {
          return res.status(404).json({ success: false, message: "Ad not found" });
        }
        return res.status(200).json({ success: true, ad });
      }

      // ✅ Ads by user
      if (userId) {
        const ads = await Advertisement.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(ads);
      }

      // ✅ All ads
      const ads = await Advertisement.find().sort({ createdAt: -1 });
      return res.status(200).json(ads);
    }

    // ✅ POST (create ad)
    if (req.method === "POST") {
      const { userId, title, description, bhk, houseNo, area, district, phone, images } =
        req.body || {};

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

      const ad = new Advertisement({
        userId,
        title,
        description,
        bhk,
        address: { houseNo, area, district, phone },
        images: Array.isArray(images) ? images : [], // ✅ Cloudinary URLs
      });

      await ad.save();
      return res.status(201).json({ success: true, ad });
    }

    // ✅ PUT (edit ad) expects ?id=
    if (req.method === "PUT") {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: "Ad ID required" });
      }

      const { title, description, bhk, houseNo, area, district, phone, images } =
        req.body || {};

      const updated = await Advertisement.findByIdAndUpdate(
        id,
        {
          title,
          description,
          bhk,
          address: { houseNo, area, district, phone },
          ...(Array.isArray(images) ? { images } : {}), // ✅ keep existing if not sent
        },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ success: false, message: "Ad not found" });
      }

      return res.status(200).json({ success: true, ad: updated });
    }

    // ✅ DELETE (?id=)
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
