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

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Shifting Service</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="from_location" placeholder="From Location" value={form.from_location} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="to_location" placeholder="To Location" value={form.to_location} onChange={handleChange} className="w-full p-2 border rounded" required />

        <select name="shift_type" value={form.shift_type} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Shift Type</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Furniture">Furniture</option>
        </select>

        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookShifting;
