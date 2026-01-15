import mongoose from "mongoose";

const userUsageSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Firebase UID
  freeAdsUsed: { type: Number, default: 0 },
});

export default mongoose.model("UserUsage", userUsageSchema);
