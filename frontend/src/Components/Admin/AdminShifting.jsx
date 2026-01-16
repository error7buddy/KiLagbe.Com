import React, { useEffect, useState } from "react";

const AdminShifting = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Backend API
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!API) {
      console.error("❌ VITE_API_URL is missing");
      return;
    }
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // ✅ DELETE (real backend delete)
  const handleDeleteOrder = async (_id) => {
    if (!window.confirm("Delete this shifting order permanently?")) return;

    try {
      const res = await fetch(`${API}/api/shifting-orders?id=${_id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== _id));
        alert("✅ Shifting order deleted!");
      } else {
        alert(data?.message || "❌ Failed to delete order");
      }
    } catch (error) {
      console.error("Delete shifting order error:", error);
      alert("❌ Error deleting order");
    }
  };

  // ✅ COMPLETE (real backend complete)
  const handleMarkComplete = async (_id) => {
    try {
      const res = await fetch(
        `${API}/api/shifting-orders?id=${_id}&action=complete`,
        { method: "PUT" }
      );
      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === _id ? { ...o, status: "Completed" } : o))
        );
        alert("✅ Marked as completed!");
      } else {
        alert(data?.message || "❌ Failed to update order");
      }
    } catch (error) {
      console.error("Complete shifting order error:", error);
      alert("❌ Error updating order");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🚚 Manage Shifting Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No shifting orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
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
                      className={`px-2 py-1 rounded text-white ${
                        o.status === "Completed" ? "bg-green-600" : "bg-yellow-500"
                      }`}
                    >
                      {o.status || "Pending"}
                    </span>
                  </td>

                  <td className="border p-2 text-center space-x-2">
                    {o.status !== "Completed" && (
                      <button
                        onClick={() => handleMarkComplete(o._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteOrder(o._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
  );
};

export default AdminShifting;
