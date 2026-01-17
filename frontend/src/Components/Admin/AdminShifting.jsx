import React, { useEffect, useState } from "react";

const AdminShifting = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!API) return;
    fetchOrders();
  }, [API]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/shifting-orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching shifting orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (_id) => {
    if (!window.confirm("Delete this shifting order permanently?")) return;
    try {
      const res = await fetch(`${API}/api/shifting-orders?id=${_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== _id));
        alert("✅ Deleted!");
      } else {
        alert(data?.message || "❌ Failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting");
    }
  };

  const handleMarkComplete = async (_id) => {
    try {
      const res = await fetch(`${API}/api/shifting-orders?id=${_id}&action=complete`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === _id ? { ...o, status: "Completed" } : o))
        );
        alert("✅ Completed!");
      } else {
        alert(data?.message || "❌ Failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error updating");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          🚚 Manage Shifting Orders
        </h1>

        {loading ? (
          <p className="text-gray-700">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-700">No shifting orders found.</p>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 sm:hidden">
              {orders.map((o) => (
                <div key={o._id} className="bg-white rounded-lg shadow border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 break-words">{o.name}</p>
                      <p className="text-sm text-gray-600">{o.phone}</p>
                    </div>

                    <span
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                        o.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.status || "Pending"}
                    </span>
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
                        onClick={() => handleMarkComplete(o._id)}
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

            {/* Table for Tablet/Desktop */}
            <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow border">
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
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            o.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {o.status || "Pending"}
                        </span>
                      </td>
                      <td className="border p-2 text-center">
                        <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
                          {o.status !== "Completed" && (
                            <button
                              onClick={() => handleMarkComplete(o._id)}
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
    </div>
  );
};

export default AdminShifting;
