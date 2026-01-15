import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";

const AdCard = ({ ad }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      {ad.images?.length > 0 && (
        <img
          src={ad.images[0]} // Assuming your backend returns URL for images
          alt={ad.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{ad.description}</p>
        <p className="text-gray-800 font-semibold">{ad.bhk} BHK - {ad.area}</p>
        <p className="text-gray-600 text-sm">{ad.district}</p>
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
    images: [],
  });
  const [ads, setAds] = useState([]);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const navigate = useNavigate();

  // Fetch ads from backend
  const fetchAds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads");
      setAds(res.data.ads || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({ ...prev, images: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) return alert("Please login first");

      const data = new FormData();
      data.append("userId", user.uid);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("bhk", formData.bhk);
      data.append("houseNo", formData.houseNo);
      data.append("area", formData.area);
      data.append("district", formData.district);
      data.append("phone", formData.phone);

      for (let i = 0; i < formData.images.length; i++) {
        data.append("images", formData.images[i]);
      }

      const res = await axios.post("http://localhost:5000/api/ads", data);

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
        fetchAds(); // Refresh ads after posting
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
      {/* Ad Form */}
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
          className="w-full mb-2 border border-gray-300 rounded-md px-3 py-2
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:bg-black file:text-white
             hover:file:bg-white
             hover:file:text-black 
             hover:file:border
             hover:file:transition"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border transition"
        >
          Post Ad
        </button>
      </form>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <AdCard key={ad._id} ad={ad} />
        ))}
      </div>

      {/* Limit Modal */}
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
