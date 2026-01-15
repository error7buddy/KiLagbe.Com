import React, { useState } from "react";
import axios from "axios";
import { auth } from "../../Firebase/config";

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
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/upgrade", {
        user_id: user.uid,
        method,
        trx_id: trxId,
      });
      if (res.data.success) {
        alert("✅ Payment successful! You are now Premium!");
        onSuccess();
        onClose();
      } else {
        alert("❌ Payment failed.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Payment error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Upgrade to Premium</h2>
            <p className="text-gray-600 text-sm text-center mb-4">
              Choose your preferred payment method:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Bkash", "Nagad", "Rocket", "Stripe"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`border rounded-lg p-3 text-center ${
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
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-bold mb-4 text-center">Complete Payment</h2>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Send payment to official {method} number:
              <br />
              <span className="font-semibold text-black">01911-123456</span>
            </p>
            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-400 rounded-lg py-2 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={confirmPayment}
                disabled={loading}
                className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
