import React from "react";
import aboutImg from "./image.png";

const About = () => {
  return (
    <section className="bg-white dark:bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left Side - Image */}
        <div className="relative">


          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-2xl shadow-lg object-cover w-full h-64 sm:h-80 md:h-[400px]"
          />
          {/* Badge */}
          <div className="absolute left-3 right-3 sm:left-4 sm:right-auto -bottom-4 sm:-bottom-5 bg-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-md w-fit max-w-[calc(100%-1.5rem)] sm:max-w-none">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold whitespace-normal">
              10+ Years of Experience
            </h3>
          </div>
        </div>

        {/* Right Side - Text */}
        <div className="pt-6 md:pt-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            About{" "}
            <span className="text-gray-600 dark:text-gray-300">কী লাগবে.com?</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            কী লাগবে.com? is a trusted platform connecting homeowners with reliable shifting
            and moving services across the country. Whether you’re moving across town or
            across districts, our goal is to make your relocation smooth, efficient, and
            stress-free.
          </p>

          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            We also provide a dedicated space for property advertisements, helping owners
            and buyers connect easily. With a growing community and user-friendly tools,
            HomeShift simplifies every step of the moving and housing journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {/* Point 1 */}
            <div className="flex items-start sm:items-center gap-3">
              <div className="shrink-0 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200 font-medium">
                Reliable Shifting Services
              </p>
            </div>

            {/* Point 2 */}
            <div className="flex items-start sm:items-center gap-3">
              <div className="shrink-0 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200 font-medium">
                Easy Property Listings
              </p>
            </div>

            {/* Point 3 */}
            <div className="flex items-start sm:items-center gap-3">
              <div className="shrink-0 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m-3-7a9 9 0 110 18 9 9 0 010-18z"
                  />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200 font-medium">
                Quick Support Response
              </p>
            </div>

            {/* Point 4 */}
            <div className="flex items-start sm:items-center gap-3">
              <div className="shrink-0 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4m16 0a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-900 dark:text-gray-200 font-medium">
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
