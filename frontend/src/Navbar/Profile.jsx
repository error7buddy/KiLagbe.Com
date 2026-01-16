// src/Navbar/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [loadingAds, setLoadingAds] = useState(true);
  const navigate = useNavigate();

  // ✅ Check auth and set user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/auth");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Fetch ads for this user (backend supports ?userId=)
  const fetchUserAds = async (uid) => {
    try {
      if (!API) {
        console.error("❌ VITE_API_URL missing in frontend env");
        setAds([]);
        return;
      }

      setLoadingAds(true);

      const res = await fetch(`${API}/api/ads?userId=${encodeURIComponent(uid)}`);
      const data = await res.json();

      setAds(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching user ads:", err);
      setAds([]);
    } finally {
      setLoadingAds(false);
    }
  };

  useEffect(() => {
    if (user?.uid) fetchUserAds(user.uid);
  }, [user]);

  // ✅ Delete ad (backend expects ?id=)
  const handleDeleteAd = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      if (!API) return alert("❌ VITE_API_URL missing in env");

      const url = `${API}/api/ads?id=${encodeURIComponent(_id)}`;
      console.log("DELETE URL:", url);

      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const text = await res.text(); // raw response for debugging
      console.log("DELETE STATUS:", res.status);
      console.log("DELETE RESPONSE:", text);

      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (res.ok && data.success) {
        setAds((prev) => prev.filter((ad) => ad._id !== _id));
        alert("✅ Ad deleted successfully!");
      } else {
        alert(data.message || `❌ Failed to delete ad (status ${res.status})`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting ad (check console/network)");
    }
  };

  // ✅ Edit ad (your route)
  const handleEditAd = (_id) => {
    navigate(`/edit-ad/${_id}`);
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-10">

        {/* ===== Profile Card ===== */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={user.photoURL || "https://i.ibb.co.com/sJjJnc3T/image.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-300 object-cover"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-lg font-semibold">{user.email}</p>
            <p className="text-sm text-gray-500 break-all">UID: {user.uid}</p>
          </div>
        </div>

        {/* ===== Ads Section ===== */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Ads</h2>

          {loadingAds ? (
            <div className="bg-white rounded-lg p-6 text-center text-gray-600 shadow">
              Loading your ads...
            </div>
          ) : ads.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center text-gray-600 shadow">
              You have not posted any ads yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map((ad) => (
                <div
                  key={ad._id}
                  className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col"
                >
                  <h3 className="text-lg font-bold mb-1">{ad.title}</h3>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {ad.description}
                  </p>

                  <p className="text-sm text-gray-500 mb-3">
                    📍 {ad.address?.area}, {ad.address?.district}
                  </p>

                  {/* ⚠️ Vercel can't serve /uploads */}
                  {ad.images?.[0] && (
                    <div className="w-full h-40 object-cover rounded-lg mb-4 bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      Image requires Cloudinary / Firebase Storage
                    </div>
                  )}

                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleEditAd(ad._id)}
                      className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAd(ad._id)}
                      className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
