import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await axios.post(url, form);
  return res.data.secure_url; // ✅ final hosted image URL
}

const AdFormPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bhk: "",
    houseNo: "",
    area: "",
    district: "",
    phone: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: files ? Array.from(files) : [],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) return alert("Please login first");

      if (!API) return alert("VITE_API_URL missing");
      if (!CLOUD_NAME || !UPLOAD_PRESET)
        return alert("Cloudinary env missing (VITE_CLOUDINARY_*)");

      setUploading(true);

      // ✅ 1) Upload images to Cloudinary
      let imageUrls = [];
      if (formData.images?.length) {
        imageUrls = await Promise.all(
          formData.images.slice(0, 5).map((file) => uploadToCloudinary(file))
        );
      }

      // ✅ 2) Post ad with Cloudinary URLs
      const payload = {
        userId: user.uid,
        title: formData.title,
        description: formData.description,
        bhk: formData.bhk,
        houseNo: formData.houseNo,
        area: formData.area,
        district: formData.district,
        phone: formData.phone,
        images: imageUrls, // ✅ URLs saved in MongoDB
      };

      const res = await axios.post(`${API}/api/ads`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        alert("✅ Ad posted successfully!");
        setFormData({
          title: "",
          description: "",
          bhk: "",
          houseNo: "",
          area: "",
          district: "",
          phone: "",
          images: [],
        });
        navigate("/profile");
      } else {
        alert(res.data.message || "❌ Failed to post ad");
      }
    } catch (err) {
      console.error("Post ad error:", err?.response?.data || err.message);

      if (err.response?.status === 403) {
        setShowLimitModal(true);
      } else {
        alert(err.response?.data?.message || "Error posting ad");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-10 mb-10"
      >
        <h2 className="text-xl font-bold mb-4">Post Advertisement</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="bhk"
          placeholder="BHK"
          value={formData.bhk}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="houseNo"
          placeholder="House No"
          value={formData.houseNo}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="area"
          placeholder="Area"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="file"
          name="images"
          onChange={handleChange}
          multiple
          accept="image/*"
          className="w-full mb-2 border border-gray-300 rounded-md px-3 py-2"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border transition disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Post Ad"}
        </button>
      </form>

      {/* Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg z-10">
            <h3 className="text-lg font-bold mb-4">⚠️ Limit Reached</h3>
            <p className="mb-4">
              You have reached your free ad limit. Delete an existing ad from your profile to post a new one.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border transition"
            >
              Go to Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdFormPage;
