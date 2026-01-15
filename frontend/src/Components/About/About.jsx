import React from "react";

const About = () => {
  return (
    <section className="bg-white dark:bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <div className="relative">
          <img
            src="src/Components/About/image.png"
            alt="About Us"
            className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
          />
          <div className="absolute -bottom-5 -left-5 bg-gray-800 text-white px-6 py-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">10+ Years of Experience</h3>
          </div>
        </div>

        {/* Right Side - Text */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-gray-600 dark:text-gray-300">কী লাগবে.com?</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            কী লাগবে.com? is a trusted platform connecting homeowners with reliable shifting
            and moving services across the country. Whether you’re moving across town or
            across districts, our goal is to make your relocation smooth, efficient, and
            stress-free.
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            We also provide a dedicated space for property advertisements, helping owners
            and buyers connect easily. With a growing community and user-friendly tools,
            HomeShift simplifies every step of the moving and housing journey.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {/* Point 1 */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-900 dark:text-gray-200 font-medium">
                Reliable Shifting Services
              </p>
            </div>

            {/* Point 2 */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-900 dark:text-gray-200 font-medium">
                Easy Property Listings
              </p>
            </div>

            {/* Point 3 */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m-3-7a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              </div>
              <p className="text-gray-900 dark:text-gray-200 font-medium">
                Quick Support Response
              </p>
            </div>

            {/* Point 4 */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4m16 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
              </div>
              <p className="text-gray-900 dark:text-gray-200 font-medium">
                Trusted by Thousands
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
