import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const BookShifting = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    from_location: "",
    from_floor: "",
    to_location: "",
    to_floor: "",
    shift_type: "",
    date: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const resetForm = () =>
    setForm({
      name: "",
      phone: "",
      from_location: "",
      from_floor: "",
      to_location: "",
      to_floor: "",
      shift_type: "",
      date: "",
      message: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!API) return alert("❌ VITE_API_URL missing");

      // ✅ send only what backend schema supports
      const payload = {
        name: form.name,
        phone: form.phone,
        from_location: form.from_location,
        to_location: form.to_location,
        shift_type: form.shift_type,
        date: form.date,
      };

      const res = await axios.post(`${API}/api/shifting-orders`, payload);

      if (res.data?.success) {
        alert("✅ Shifting order booked successfully!");
        resetForm();
      } else {
        alert(res.data?.message || "❌ Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || "❌ Failed to book shifting service");
    }
  };

  // ✅ Clear UI if API missing (no behavior change, just clarity)
  if (!API) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
        <div className="bg-white border rounded-xl shadow p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">⚠️ Service Unavailable</h2>
          <p className="text-sm text-gray-600">
            API configuration is missing. Please set <span className="font-medium">VITE_API_URL</span> and redeploy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Book a Shifting Service
        </h2>

        {/* ✅ Trust note for Google Safe Browsing (no functionality change) */}
        <p className="text-xs text-gray-500 mb-4">
          Educational project — booking requests are stored for demo/testing. Do not submit sensitive information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-black/20"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-black/20"
            required
          />

          <input
            name="from_location"
            placeholder="From Location"
            value={form.from_location}
            onChange={handleChange}
            className="w-full p-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-black/20"
            required
          />

          <input
            name="to_location"
            placeholder="To Location"
            value={form.to_location}
            onChange={handleChange}
            className="w-full p-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-black/20"
            required
          />

          <select
            name="shift_type"
            value={form.shift_type}
            onChange={handleChange}
            className="w-full p-2.5 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
            required
          >
            <option value="">Select Shift Type</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Furniture">Furniture</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-black/20"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded hover:bg-gray-800 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookShifting;
