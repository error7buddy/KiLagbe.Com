import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  // ✅ Load ad
  useEffect(() => {
    const loadAd = async () => {
      try {
        if (!API) {
          alert("VITE_API_URL missing");
          return navigate("/profile");
        }

        setLoading(true);
        const res = await axios.get(`${API}/api/ads?id=${id}`);

        const ad = res.data?.ad;
        if (!ad) {
          alert("Ad not found");
          return navigate("/profile");
        }

        setFormData({
          title: ad.title || "",
          description: ad.description || "",
          bhk: ad.bhk || "",
          houseNo: ad.address?.houseNo || "",
          area: ad.address?.area || "",
          district: ad.address?.district || "",
          phone: ad.address?.phone || "",
          images: Array.isArray(ad.images) ? ad.images : [],
        });
      } catch (err) {
        console.error("Load ad error:", err?.response?.data || err.message);
        alert("Failed to load ad");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadAd();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ✅ Update ad
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        bhk: formData.bhk,
        houseNo: formData.houseNo,
        area: formData.area,
        district: formData.district,
        phone: formData.phone,
        images: formData.images, // keep Cloudinary URLs
      };

      const res = await axios.put(`${API}/api/ads?id=${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data?.success) {
        alert("✅ Ad updated!");
        navigate("/profile");
      } else {
        alert(res.data?.message || "❌ Update failed");
      }
    } catch (err) {
      console.error("Update ad error:", err?.response?.data || err.message);
      alert(err?.response?.data?.message || `❌ Update failed (${err?.response?.status || ""})`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading ad...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Edit Advertisement</h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          name="bhk"
          value={formData.bhk}
          onChange={handleChange}
          placeholder="BHK"
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          name="houseNo"
          value={formData.houseNo}
          onChange={handleChange}
          placeholder="House No"
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area"
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="District"
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 mb-4 border rounded"
        />

        {formData.images?.[0] && (
          <img
            src={formData.images[0]}
            alt="Ad"
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex-1 border py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-black text-white py-2 rounded hover:bg-white hover:text-black border transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAd;
