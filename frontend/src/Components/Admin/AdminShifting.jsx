import React, { useEffect, useState } from "react";

const AdminShifting = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/shifting-orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching shifting orders:", error);
    }
  };

  // ✅ FRONTEND DELETE ONLY
  const handleDeleteOrder = (_id) => {
    if (!window.confirm("Delete this shifting order?")) return;

    setOrders((prev) => prev.filter((o) => o._id !== _id));
  };

  // ✅ FRONTEND COMPLETE ONLY
  const handleMarkComplete = (_id) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === _id ? { ...o, status: "Completed" } : o
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🚚 Manage Shifting Orders</h1>

      {orders.length === 0 ? (
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
                        o.status === "Completed"
                          ? "bg-green-600"
                          : "bg-yellow-500"
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
