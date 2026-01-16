import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const AdCard = ({ ad }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
        {ad.images?.length ? "Image URL needed (Cloudinary/Firebase)" : "No image"}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{ad.description}</p>
        <p className="text-gray-800 font-semibold">
          {ad.bhk} BHK - {ad.address?.area}
        </p>
        <p className="text-gray-600 text-sm">{ad.address?.district}</p>
        {ad.address?.phone && (
          <p className="text-gray-700 text-sm mt-1">📞 {ad.address.phone}</p>
        )}
      </div>
    </div>
  );
};

const AdFormPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bhk: "",
    houseNo: "",
    area: "",
    district: "",
    phone: "",
  });

  const [ads, setAds] = useState([]);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const navigate = useNavigate();

  const fetchAds = async () => {
    try {
      if (!API) return console.error("❌ VITE_API_URL missing");
      const res = await axios.get(`${API}/api/ads`);
      setAds(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch ads error:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!API) return;
    fetchAds();
  }, [API]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) return alert("Please login first");
      if (!API) return alert("VITE_API_URL missing");

      const payload = {
        userId: user.uid,
        title: formData.title,
        description: formData.description,
        bhk: formData.bhk,
        houseNo: formData.houseNo,
        area: formData.area,
        district: formData.district,
        phone: formData.phone,
        images: [], // later store Cloudinary/Firebase URLs here
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
        });
        fetchAds();
      } else {
        alert(res.data.message || "❌ Failed to post ad");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setShowLimitModal(true);
      } else {
        alert(err.response?.data?.message || "Error posting ad");
      }
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

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border transition"
        >
          Post Ad
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </div>

      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg z-10">
            <h3 className="text-lg font-bold mb-4">⚠️ Limit Reached</h3>
            <p className="mb-4">
              You have reached your free ad limit. Delete an existing ad from
              your profile to post a new one.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdFormPage;
