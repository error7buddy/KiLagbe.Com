import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // ✅ Accept Firebase UID string
      required: true,
    },
    title: String,
    description: String,
    bhk: String,
    address: {
      houseNo: String,
      area: String,
      district: String,
      phone: String,
    },
    images: [String],
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Advertisement", adSchema);
