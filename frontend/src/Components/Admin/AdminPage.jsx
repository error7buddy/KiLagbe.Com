import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const isUrl = (s) => typeof s === "string" && /^https?:\/\//i.test(s);

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("ads");
  const [ads, setAds] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/login");
  }, [navigate]);

  const fetchAds = async () => {
    try {
      const res = await fetch(`${API}/api/ads`);
      const data = await res.json();
      setAds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/api/shifting-orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (!API) return;
    fetchAds();
    fetchOrders();
  }, [API]);

  const handleDeleteAd = async (_id) => {
    if (!window.confirm("Delete this ad permanently?")) return;
    try {
      const res = await fetch(`${API}/api/ads?id=${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAds((prev) => prev.filter((ad) => ad._id !== _id));
        alert("✅ Ad deleted!");
      } else {
        alert(data?.message || "❌ Failed to delete ad");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting ad");
    }
  };

  const handleDeleteOrder = async (_id) => {
    if (!window.confirm("Delete this shifting order permanently?")) return;
    try {
      const res = await fetch(`${API}/api/shifting-orders?id=${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== _id));
        alert("✅ Order deleted!");
      } else {
        alert(data?.message || "❌ Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting order");
    }
  };

  const handleCompleteOrder = async (_id) => {
    try {
      const res = await fetch(`${API}/api/shifting-orders?id=${_id}&action=complete`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === _id ? { ...o, status: "Completed" } : o))
        );
        alert("✅ Order completed!");
      } else {
        alert(data?.message || "❌ Failed to complete order");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error completing order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            🛠 Admin Dashboard
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              navigate("/login");
            }}
            className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-2 sm:gap-0">
            <button
              onClick={() => setActiveTab("ads")}
              className={`w-full px-6 py-3 text-base sm:text-lg font-semibold transition rounded-xl sm:rounded-r-none ${
                activeTab === "ads"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Manage Ads
            </button>

            <button
              onClick={() => setActiveTab("shifting")}
              className={`w-full px-6 py-3 text-base sm:text-lg font-semibold transition rounded-xl sm:rounded-l-none ${
                activeTab === "shifting"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Manage Shifting
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6">
          {activeTab === "ads" && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-blue-700">
                🏠 Advertisements
              </h2>

              {ads.length === 0 ? (
                <p className="text-gray-600 text-center">No advertisements found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {ads.map((ad) => {
                    const img = ad.images?.[0];
                    const showImg = isUrl(img);

                    return (
                      <div
                        key={ad._id}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col"
                      >
                        <h3 className="text-base sm:text-lg font-bold mb-1 break-words">
                          {ad.title || "No Title"}
                        </h3>

                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {ad.description || "No description"}
                        </p>

                        <p className="text-sm text-gray-500 mb-1">
                          📍 {ad.address?.area || "Unknown Area"},{" "}
                          {ad.address?.district || "Unknown District"}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          📞 {ad.address?.phone || "N/A"}
                        </p>

                        {/* ✅ Cloudinary Image */}
                        {showImg ? (
                          <img
                            src={img}
                            alt={ad.title || "Ad"}
                            className="w-full h-40 sm:h-44 object-cover rounded mb-3"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-40 sm:h-44 bg-gray-100 rounded mb-3 flex items-center justify-center text-xs text-gray-500">
                            No image
                          </div>
                        )}

                        <button
                          onClick={() => handleDeleteAd(ad._id)}
                          className="mt-auto w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                        >
                          Delete Ad
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "shifting" && (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-blue-700">
                🚚 Shifting Orders
              </h2>

              {orders.length === 0 ? (
                <p className="text-gray-600 text-center">No shifting orders found.</p>
              ) : (
                <>
                  {/* Mobile Cards (sm and below) */}
                  <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {orders.map((o) => (
                      <div key={o._id} className="border rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 break-words">{o.name}</p>
                            <p className="text-sm text-gray-600">{o.phone}</p>
                          </div>

                          <div className="shrink-0">
                            {o.status === "Completed" ? (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                Completed
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                          <p>
                            <span className="text-gray-500">From:</span>{" "}
                            <span className="break-words">{o.from_location}</span>
                          </p>
                          <p>
                            <span className="text-gray-500">To:</span>{" "}
                            <span className="break-words">{o.to_location}</span>
                          </p>
                          <p>
                            <span className="text-gray-500">Type:</span> {o.shift_type}
                          </p>
                          <p>
                            <span className="text-gray-500">Date:</span> {o.date}
                          </p>
                        </div>

                        <div className="mt-4 flex gap-2">
                          {o.status !== "Completed" && (
                            <button
                              onClick={() => handleCompleteOrder(o._id)}
                              className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(o._id)}
                            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Table (sm and up) */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="min-w-full border border-gray-200 text-sm">
                      <thead className="bg-gray-100 text-gray-700">
                        <tr>
                          <th className="border p-2 whitespace-nowrap">Name</th>
                          <th className="border p-2 whitespace-nowrap">Phone</th>
                          <th className="border p-2 whitespace-nowrap">From</th>
                          <th className="border p-2 whitespace-nowrap">To</th>
                          <th className="border p-2 whitespace-nowrap">Type</th>
                          <th className="border p-2 whitespace-nowrap">Date</th>
                          <th className="border p-2 whitespace-nowrap">Status</th>
                          <th className="border p-2 whitespace-nowrap">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.map((o) => (
                          <tr key={o._id} className="hover:bg-gray-50">
                            <td className="border p-2">{o.name}</td>
                            <td className="border p-2">{o.phone}</td>
                            <td className="border p-2">{o.from_location}</td>
                            <td className="border p-2">{o.to_location}</td>
                            <td className="border p-2">{o.shift_type}</td>
                            <td className="border p-2">{o.date}</td>
                            <td className="border p-2 text-center">
                              {o.status === "Completed" ? (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                  Completed
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                  Pending
                                </span>
                              )}
                            </td>
                            <td className="border p-2 text-center">
                              <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                                {o.status !== "Completed" && (
                                  <button
                                    onClick={() => handleCompleteOrder(o._id)}
                                    className="w-full lg:w-auto bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                                  >
                                    Complete
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteOrder(o._id)}
                                  className="w-full lg:w-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
