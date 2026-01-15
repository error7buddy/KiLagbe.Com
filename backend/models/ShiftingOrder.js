import mongoose from "mongoose";

const shiftingSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    from_location: String,
    to_location: String,
    shift_type: String,
    date: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("ShiftingOrder", shiftingSchema);
