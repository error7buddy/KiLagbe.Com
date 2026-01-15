import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdvertisementList() {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ADS_PER_PAGE = 9;

  // Fetch all ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ads");
        setAds(res.data);
        setFilteredAds(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  // Filter ads whenever searchTerm changes
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
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, ads]);

  if (loading) return <p className="text-center mt-6">Loading ads...</p>;
  if (!ads.length) return <p className="text-center mt-6">No ads found</p>;

  // Pagination logic
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Input */}
      <div className="mb-8 relative">
        <input
          type="text"
          placeholder="Search by area, district, BHK, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full
            px-5 py-4
            text-black
            bg-white
            border-2 border-black
            rounded-full
            shadow-md
            placeholder-gray-500
            transition-all duration-300
            focus:outline-none
            focus:bg-black
            focus:text-white
            focus:placeholder-gray-400
            focus:shadow-xl
          "
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-black pointer-events-none">
          🔍
        </span>
      </div>

      {/* Ads Grid */}
      {currentAds.length === 0 ? (
        <p className="text-center text-gray-500">No ads match your search.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAds.map((ad) => (
            <div
              key={ad._id}
              className="border rounded-lg shadow bg-white overflow-hidden"
            >
              {ad.images?.length > 0 && (
                <img
                  src={`http://localhost:5000/uploads/${ad.images[0]}`}
                  className="h-48 w-full object-cover"
                  alt={ad.title || "ad"}
                />
              )}

              <div className="p-4">
                <h2 className="font-bold text-lg">{ad.title}</h2>
                <p className="text-sm text-gray-600">
                  {ad.address?.area || "Unknown Area"}, {ad.address?.district || "Unknown District"}
                </p>
                <p className="mt-2">{ad.bhk || "N/A"} BHK</p>
                <p className="text-sm text-gray-500 mt-2">{ad.description || "No description available."}</p>
                {ad.address?.phone && (
                  <p className="text-sm text-gray-700 mt-2">📞 {ad.address.phone}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`px-3 py-1 border rounded ${num === currentPage ? "bg-black text-white" : ""}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
