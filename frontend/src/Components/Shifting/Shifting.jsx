import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentMethodsCarousel from "../Payment/PaymentMethodsCarousel";

export default function Shifting() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Local Room Shifting",
      description:
        "Move your room furniture and essentials safely within the city.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "House Shifting",
      description:
        "Full house moving with packing, loading, and transport services.",
      image:
        "src/Components/Shifting/images/image.png",
    },
    {
      id: 3,
      title: "Office Relocation",
      description:
        "Professional shifting for offices with safe handling of equipment.",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">🏠 Shifting Service</h1>
      <p className="text-gray-600 text-center max-w-2xl mb-10">
        Choose your service type and book your shifting order online.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {service.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <button
                onClick={() => navigate(`/book-shifting/${service.id}`)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <br /><br /><br /><br />
      <br />
      <PaymentMethodsCarousel />
    </div>
  );
}
