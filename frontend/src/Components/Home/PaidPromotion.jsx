import React from "react";

export default function PaidPromotion() {
  return (
    <div className="sticky top-20 bottom-20">
      <div className="min-h-[70vh] rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 flex flex-col">
        <h2 className="text-base font-semibold text-center mb-2">
          Paid Promotions
        </h2>

        <p className="text-xs text-gray-600 text-center mb-4">
          Your sponsored ads will appear here.
        </p>

        {/* Big slot to visually fill the gap */}
        <div className="flex-1 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 text-sm">
          Promotion Slot
        </div>

        <div className="mt-4 text-[11px] text-gray-500 text-center">
          Contact admin to promote
        </div>
      </div>
    </div>
  );
}
