import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    unique: true,
    required: true,
  },
  totalAdsPosted: {
    type: Number,
    default: 0, // 👈 permanent counter
  },
});

export default mongoose.model("User", userSchema);
