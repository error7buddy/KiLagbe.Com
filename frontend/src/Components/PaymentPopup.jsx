import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../Firebase/config";

const API = import.meta.env.VITE_API_URL;

// ✅ Safe API base: in production uses VITE_API_URL, in dev can fallback
const API_BASE =
  API || (import.meta.env.DEV ? "http://localhost:5000" : "");

export default function PaymentPopup({ onClose, onSuccess }) {
  const [method, setMethod] = useState("");
  const [trxId, setTrxId] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (!method) return alert("Please select a payment method!");
    setStep(2);
  };

  const confirmPayment = async () => {
    if (!trxId.trim()) return alert("Please enter your transaction ID!");

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first!");
      return;
    }

    if (!API_BASE) {
      alert("❌ API not configured (VITE_API_URL missing)");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/upgrade`, {
        user_id: user.uid,
        method,
        trx_id: trxId,
      });

      if (res.data?.success) {
        alert("✅ Request submitted! (Demo) You are now Premium!");
        onSuccess();
        onClose();
      } else {
        alert(res.data?.message || "❌ Request failed.");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "⚠️ Request error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-[92vw] max-w-md p-5 sm:p-6 relative max-h-[85vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        {/* ✅ Trust / Anti-phishing disclaimer (no functionality change) */}
        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2 text-[12px] text-yellow-900">
          <span className="font-semibold">Demo Notice:</span> This is an educational project.
          No real payments are processed. Do not share banking or sensitive information.
        </div>

        {step === 1 && (
          <>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">
              Upgrade to Premium (Demo)
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm text-center mb-4">
              Select a demo payment method:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {["Bkash", "Nagad", "Rocket", "Stripe"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`border rounded-lg p-3 text-center text-sm sm:text-base transition ${
                    method === m
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="mt-5 sm:mt-6 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center">
              Complete (Demo)
            </h2>

            <p className="text-gray-600 text-xs sm:text-sm mb-4 text-center">
              Demo instructions for <span className="font-semibold">{method}</span>:
              <br />
              <span className="font-semibold text-black">01911-123456</span>
              <br />
              <span className="text-[11px] text-gray-500">
                (Demo number shown for UI purposes only)
              </span>
            </p>

            <input
              type="text"
              placeholder="Enter Transaction ID (Demo)"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="w-full border p-2.5 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500/30"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-full sm:flex-1 border border-gray-400 rounded-lg py-2.5 hover:bg-gray-100 transition"
                disabled={loading}
              >
                Back
              </button>

              <button
                onClick={confirmPayment}
                disabled={loading}
                className="w-full sm:flex-1 bg-green-600 text-white rounded-lg py-2.5 hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
