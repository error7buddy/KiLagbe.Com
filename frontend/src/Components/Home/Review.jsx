import React, { useState } from "react";
import { Star } from "lucide-react";

export default function Review() {
  const [showAll, setShowAll] = useState(false);

  const reviews = [
    {
      id: 1,
      user: "Rakib Hasan",
      service: "Shifting Service",
      rating: 5,
      comment:
        "দারুণ অভিজ্ঞতা! টিম খুব পেশাদার ছিল, আমার বাসার সব জিনিস একদম নিরাপদে পৌঁছে দিয়েছে। Highly recommended!",
      date: "Sep 2025",
    },
    {
      id: 2,
      user: "Sarah Ahmed",
      service: "House Rent",
      rating: 4,
      comment:
        "The renting process was smooth and quick. Found my perfect flat in less than a week!",
      date: "Aug 2025",
    },
    {
      id: 3,
      user: "Mehedi Hasan",
      service: "Shifting Service",
      rating: 5,
      comment:
        "HomeShift এর সার্ভিস অসাধারণ। সময় মতো এসেছে, সবকিছু প্যাকিং করে সুন্দরভাবে ট্রান্সফার করেছে।",
      date: "Jul 2025",
    },
    {
      id: 4,
      user: "Nusrat Jahan",
      service: "House Rent",
      rating: 5,
      comment:
        "I loved how easy it was to list and find verified houses. Great customer support too!",
      date: "Oct 2025",
    },
    {
      id: 5,
      user: "Aminul Islam",
      service: "Shifting + Rent",
      rating: 4,
      comment:
        "Shift service টা অনেক ভালো লেগেছে। নতুন বাসা ভাড়াও এখানে পেয়েছি। দুই কাজ একসাথে! ধন্যবাদ HomeShift টিমকে!",
      date: "Nov 2025",
    },
    {
      id: 6,
      user: "Maria Hossain",
      service: "Shifting Service",
      rating: 5,
      comment:
        "Fast, reliable, and affordable! The best moving experience I’ve ever had.",
      date: "Dec 2025",
    },
    {
      id: 7,
      user: "Rakib Hasan",
      service: "Shifting Service",
      rating: 5,
      comment:
        "দারুণ অভিজ্ঞতা! টিম খুব পেশাদার ছিল, আমার বাসার সব জিনিস একদম নিরাপদে পৌঁছে দিয়েছে। Highly recommended!",
      date: "Sep 2025",
    },
    {
      id: 8,
      user: "Sarah Ahmed",
      service: "House Rent",
      rating: 4,
      comment:
        "The renting process was smooth and quick. Found my perfect flat in less than a week!",
      date: "Aug 2025",
    },
    {
      id: 9,
      user: "Mehedi Hasan",
      service: "Shifting Service",
      rating: 5,
      comment:
        "HomeShift এর সার্ভিস অসাধারণ। সময় মতো এসেছে, সবকিছু প্যাকিং করে সুন্দরভাবে ট্রান্সফার করেছে।",
      date: "Jul 2025",
    },
  ];

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-white dark:bg-black min-h-screen transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center text-black dark:text-white mb-10">
        🗣️ What Our Users Say
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-black dark:text-white mb-1">
              {review.user}
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-1">
              Service: <span className="font-medium">{review.service}</span>
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mb-3">
              {review.date}
            </p>

            {/* Stars */}
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < review.rating
                      ? "text-black dark:text-white fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }
                />
              ))}
            </div>

            <p className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Show More / Less Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full border border-gray-300 hover:opacity-80 transition-all"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}
