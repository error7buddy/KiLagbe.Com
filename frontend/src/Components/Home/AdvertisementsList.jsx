import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdvertisementList() {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Backend API from env
  const API = import.meta.env.VITE_API_URL;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ADS_PER_PAGE = 9;

  useEffect(() => {
    const fetchAds = async () => {
      try {
        if (!API) {
          console.error("❌ VITE_API_URL missing");
          setAds([]);
          setFilteredAds([]);
          return;
        }

        const res = await axios.get(`${API}/api/ads`);
        const list = Array.isArray(res.data) ? res.data : [];
        setAds(list);
        setFilteredAds(list);
      } catch (err) {
        console.error("Fetch ads error:", err?.response?.data || err.message);
        setAds([]);
        setFilteredAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [API]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAds(ads);
      setCurrentPage(1);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = ads.filter((ad) => {
      return (
        ad.title?.toLowerCase().includes(term) ||
        ad.description?.toLowerCase().includes(term) ||
        ad.bhk?.toString().toLowerCase().includes(term) ||
        ad.address?.area?.toLowerCase().includes(term) ||
        ad.address?.district?.toLowerCase().includes(term)
      );
    });

    setFilteredAds(filtered);
    setCurrentPage(1);
  }, [searchTerm, ads]);

  // ✅ If API missing, show clear message (no behavior change to data flow)
  if (!API) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border rounded-xl shadow p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">⚠️ Service Unavailable</h3>
          <p className="text-sm text-gray-600">
            API configuration is missing. Please set <span className="font-medium">VITE_API_URL</span> and redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-6">Loading ads...</p>;
  if (!ads.length) return <p className="text-center mt-6">No ads found</p>;

  const indexOfLastAd = currentPage * ADS_PER_PAGE;
  const indexOfFirstAd = indexOfLastAd - ADS_PER_PAGE;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(filteredAds.length / ADS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* ✅ Trust note (helps reduce false phishing flags, no functional change) */}
      <p className="text-[11px] text-gray-500 text-center mb-4">
        Educational project — listings are user-submitted. Avoid sharing sensitive information.
      </p>

      {/* Search */}
      <div className="mb-6 sm:mb-8 relative">
        <input
          type="text"
          placeholder="Search by area, district, BHK, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full pr-12 pl-4 sm:pl-5
            py-3 sm:py-4 text-sm sm:text-base
            text-black bg-white
            border-2 border-black rounded-full shadow-md
            placeholder-gray-500 transition-all duration-300
            focus:outline-none focus:bg-black focus:text-white
            focus:placeholder-gray-400 focus:shadow-xl
          "
        />
        <span className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-black pointer-events-none text-base sm:text-lg">
          🔍
        </span>
      </div>

      {/* Grid */}
      {currentAds.length === 0 ? (
        <p className="text-center text-gray-500">No ads match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentAds.map((ad) => (
            <div
              key={ad._id}
              className="border rounded-lg shadow bg-white overflow-hidden flex flex-col"
            >
              {/* ✅ Show Cloudinary image URL */}
              {ad.images?.[0] ? (
                <img
                  src={ad.images[0]}
                  className="h-44 sm:h-48 w-full object-cover"
                  alt={ad.title || "ad"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="h-44 sm:h-48 w-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                  No image
                </div>
              )}

              <div className="p-4 flex-1">
                <h2 className="font-bold text-base sm:text-lg break-words">
                  {ad.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  {ad.address?.area || "Unknown Area"},{" "}
                  {ad.address?.district || "Unknown District"}
                </p>

                <p className="mt-2 text-sm sm:text-base">
                  {ad.bhk || "N/A"} BHK
                </p>

                <p className="text-xs sm:text-sm text-gray-500 mt-2 break-words line-clamp-3">
                  {ad.description || "No description available."}
                </p>

                {ad.address?.phone && (
                  <p className="text-xs sm:text-sm text-gray-700 mt-2 break-words">
                    📞 {ad.address.phone}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 sm:py-1 border rounded disabled:opacity-50 text-sm"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`px-3 py-2 sm:py-1 border rounded text-sm ${
                num === currentPage ? "bg-black text-white" : ""
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 sm:py-1 border rounded disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
