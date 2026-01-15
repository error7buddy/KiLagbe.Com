import React, { useState } from "react";
import axios from "axios";

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
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/shifting-orders",
        form
      );

      if (res.data.success) {
        alert("✅ Shifting order booked successfully!");
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
      } else {
        alert("❌ Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Failed to book shifting service");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Shifting Service</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="from_location" placeholder="From Location" value={form.from_location} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="from_floor" placeholder="From Floor" value={form.from_floor} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="to_location" placeholder="To Location" value={form.to_location} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="to_floor" placeholder="To Floor" value={form.to_floor} onChange={handleChange} className="w-full p-2 border rounded" />
        
        <select name="shift_type" value={form.shift_type} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Shift Type</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Furniture">Furniture</option>
        </select>

        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />

        <textarea name="message" placeholder="Additional Message" value={form.message} onChange={handleChange} className="w-full p-2 border rounded" />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookShifting;
