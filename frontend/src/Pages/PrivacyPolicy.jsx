import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>কী লাগবে.com?</strong> is an educational university project. This site is
            not a commercial service.
          </p>

          <h2 className="text-lg font-semibold">1. Information we collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account info (email/profile) via Firebase Authentication (including Google Sign-In)</li>
            <li>Ads you post (title, description, images, phone if you provide it)</li>
            <li>Shifting booking details (name, phone, from/to, type, date)</li>
          </ul>

          <h2 className="text-lg font-semibold">2. How we use information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide login and core features (ads & shifting booking)</li>
            <li>To display listings and manage orders for this project demo</li>
          </ul>

          <h2 className="text-lg font-semibold">3. Payments</h2>
          <p>
            Any “payment/premium” UI shown is <strong>demo only</strong>. No real payments are processed.
          </p>

          <h2 className="text-lg font-semibold">4. Security</h2>
          <p>
            Authentication is handled by Firebase. Images may be stored on Cloudinary. Avoid sharing sensitive data.
          </p>

          <h2 className="text-lg font-semibold">5. Contact</h2>
          <p>
            For questions, contact the project team (Vadrendra University).
          </p>
        </div>
      </div>
    </div>
  );
}
