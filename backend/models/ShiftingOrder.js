import mongoose from "mongoose";

const shiftingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },

    from_location: { type: String, required: true, trim: true },
    from_floor: { type: String, default: "", trim: true },

    to_location: { type: String, required: true, trim: true },
    to_floor: { type: String, default: "", trim: true },

    shift_type: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },

    message: { type: String, default: "", trim: true },

    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("ShiftingOrder", shiftingSchema);
