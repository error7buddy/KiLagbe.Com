import React from "react";

export default function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-10">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          Contact Admin
        </h1>

        <p className="text-sm text-gray-600 text-center mb-8">
          For any support, paid promotions, or inquiries, please contact the admin using the details below.
        </p>

        <div className="space-y-6 text-center">
          {/* Name */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Name
            </p>
            <p className="text-lg font-medium">
              Osman Aziz
            </p>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Email
            </p>
            <a
              href="mailto:fxosman7@gmail.com"
              className="text-lg font-medium text-black hover:underline"
            >
              fxosman7@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Phone
            </p>
            <a
              href="tel:01309200669"
              className="text-lg font-medium text-black hover:underline"
            >
              01309200669
            </a>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-500 text-center">
          Available for official communication only.
        </div>
      </div>
    </main>
  );
}
