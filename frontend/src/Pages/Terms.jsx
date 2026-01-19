import React from "react";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            This website is an educational university project. By using this site, you agree to these terms.
          </p>

          <h2 className="text-lg font-semibold">1. Educational use</h2>
          <p>
            The platform is for demonstration only and does not represent a real commercial entity.
          </p>

          <h2 className="text-lg font-semibold">2. User content</h2>
          <p>
            Users are responsible for the ads and information they submit. Do not submit sensitive information.
          </p>

          <h2 className="text-lg font-semibold">3. Demo payments</h2>
          <p>
            Any payment/premium functionality is demo only. No real payments are processed.
          </p>

          <h2 className="text-lg font-semibold">4. Limitation</h2>
          <p>
            The project team is not responsible for any issues arising from using this demo site.
          </p>
        </div>
      </div>
    </div>
  );
}
