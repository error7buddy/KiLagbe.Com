import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentMethodsCarousel from "../Payment/PaymentMethodsCarousel";
import houseImg from "../Shifting/images/image.png"; // ✅ local image

export default function Shifting() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Local Room Shifting",
      description: "Move your room furniture and essentials safely within the city.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "House Shifting",
      description: "Full house moving with packing, loading, and transport services.",
      image: houseImg,
    },
    {
      id: 3,
      title: "Office Relocation",
      description: "Professional shifting for offices with safe handling of equipment.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800 text-center sm:text-left">
          🏠 Shifting Service
        </h1>

        <p className="text-gray-600 text-center sm:text-left max-w-2xl mb-8 sm:mb-10">
          Choose your service type and book your shifting order online.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all flex flex-col"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-44 sm:h-48 object-cover"
                loading="lazy"
              />

              <div className="p-5 sm:p-6 text-center flex-1 flex flex-col">
                <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
                  {service.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                <button
                  onClick={() => navigate(`/book-shifting/${service.id}`)}
                  className="mt-auto w-full sm:w-auto sm:self-center bg-black text-white px-5 py-2.5 rounded-md hover:bg-white hover:text-black border transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-10 sm:mt-14">
          <PaymentMethodsCarousel />
        </div>
      </div>
    </div>
  );
}
