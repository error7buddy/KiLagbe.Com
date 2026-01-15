import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("ads");
  const [ads, setAds] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // ✅ Check admin login
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/login");
  }, [navigate]);

  // ✅ Fetch all ads
  const fetchAds = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/ads");
      const data = await res.json();
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  // ✅ Fetch all shifting orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/shifting-orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAds();
    fetchOrders();
  }, []);

  // ✅ Delete an ad permanently
  const handleDeleteAd = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this ad permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/ads/${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAds(prev => prev.filter(ad => ad._id !== _id));
        alert("✅ Ad deleted permanently!");
      } else {
        alert("❌ Failed to delete ad");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting ad");
    }
  };

  // ✅ Delete a shifting order permanently
  const handleDeleteOrder = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this shifting order permanently?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/shifting-orders/${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.filter(o => o._id !== _id));
        alert("✅ Shifting order deleted permanently!");
      } else {
        alert("❌ Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting order");
    }
  };

  // ✅ Mark shifting order as complete
  const handleCompleteOrder = async (_id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/shifting-orders/${_id}/complete`, { method: "PUT" });
      const data = await res.json();
      if (data.success) {
        setOrders(prev =>
          prev.map(o => (o._id === _id ? { ...o, status: "Completed" } : o))
        );
        alert("✅ Order marked as completed!");
      } else {
        alert("❌ Failed to update order");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error updating order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛠 Admin Dashboard
      </h1>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/login");
        }}
        className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveTab("ads")}
          className={`px-8 py-3 text-lg font-semibold transition ${
            activeTab === "ads"
              ? "bg-blue-600 text-white rounded-l-xl"
              : "bg-white text-gray-700 border"
          }`}
        >
          Manage Ads
        </button>
        <button
          onClick={() => setActiveTab("shifting")}
          className={`px-8 py-3 text-lg font-semibold transition ${
            activeTab === "shifting"
              ? "bg-blue-600 text-white rounded-r-xl"
              : "bg-white text-gray-700 border"
          }`}
        >
          Manage Shifting
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        {/* 🏠 Manage Ads */}
        {activeTab === "ads" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">
              🏠 Advertisements
            </h2>
            {ads.length === 0 ? (
              <p className="text-gray-600 text-center">No advertisements found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ads.map(ad => (
                  <div key={ad._id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <h3 className="text-lg font-bold mb-1">{ad.title || "No Title"}</h3>
                    <p className="text-sm text-gray-600 mb-1 line-clamp-2">{ad.description || "No description"}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      📍 {ad.address?.area || "Unknown Area"}, {ad.address?.district || "Unknown District"}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">📞 {ad.address?.phone || "N/A"}</p>

                    {ad.images?.length > 0 && ad.images.map((img, i) => (
                      <img key={i} src={`http://localhost:5000/uploads/${img}`} alt={ad.title || "Ad Image"} className="w-full h-40 object-cover rounded mb-2" />
                    ))}

                    <button
                      onClick={() => handleDeleteAd(ad._id)}
                      className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete Ad
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 🚚 Manage Shifting */}
        {activeTab === "shifting" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">🚚 Shifting Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600 text-center">No shifting orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Phone</th>
                      <th className="border p-2">From</th>
                      <th className="border p-2">To</th>
                      <th className="border p-2">Type</th>
                      <th className="border p-2">Date</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id} className="hover:bg-gray-50">
                        <td className="border p-2">{o.name}</td>
                        <td className="border p-2">{o.phone}</td>
                        <td className="border p-2">{o.from_location}</td>
                        <td className="border p-2">{o.to_location}</td>
                        <td className="border p-2">{o.shift_type}</td>
                        <td className="border p-2">{o.date}</td>
                        <td className="border p-2 text-center">
                          {o.status === "Completed" ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Completed</span>
                          ) : (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending</span>
                          )}
                        </td>
                        <td className="border p-2 text-center space-x-2">
                          {o.status !== "Completed" && (
                            <button
                              onClick={() => handleCompleteOrder(o._id)}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(o._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
