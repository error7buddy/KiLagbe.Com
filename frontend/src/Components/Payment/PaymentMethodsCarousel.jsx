import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// ✅ Example payment method data
const paymentMethods = [
  {
    id: 1,
    name: "Visa",
    description: "Pay securely with your Visa credit or debit card.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  },
  {
    id: 2,
    name: "Mastercard",
    description: "Use your Mastercard for fast and safe payments.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  },
  {
    id: 3,
    name: "PayPal",
    description: "Checkout quickly using your PayPal account.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    id: 4,
    name: "Google Pay",
    description: "Pay easily via Google Pay on supported devices.",
    logo: "src/Components/Payment/logos/Google_Pay_Logo.svg.png",
  },
  {
    id: 5,
    name: "Apple Pay",
    description: "Use Apple Pay for quick and secure mobile payments.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 6,
    name: "bKash",
    description: "Pay easily using your bKash mobile wallet.",
    logo: "src/Components/Payment/logos/1656227518bkash-logo-png.png",

  },
  {
    id: 7,
    name: "Nagad",
    description: "Fast and secure payments via Nagad account.",
    logo: "src/Components/Payment/logos/Nagad_Logo_horizontally_og.png",

  },
  {
    id: 8,
    name: "Rocket",
    description: "Pay with Rocket (Dutch-Bangla Mobile Banking).",
    logo: "src/Components/Payment/logos/dutch-bangla-rocket-logo-png_seeklogo-317692.png",

  },
];

export default function PaymentMethodsCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 200,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div>
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">
        💳 Choose Your Payment Method
      </h2>

      <Slider {...settings}>
        {paymentMethods.map((method) => (
          <div key={method.id} className="px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center p-6 hover:shadow-xl transition duration-300">
              <div className="w-24 h-24 flex justify-center items-center mb-4">
                <img
                  src={method.logo}
                  alt={method.name}
                  className="object-contain max-h-20"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{method.name}</h3>
              <p className="text-sm text-gray-600 mt-2 h-12">
                {method.description}
              </p>
              <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black border border-black transition">
                Use {method.name}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    <br /><br /><br /><br /><br />
    </div>
  );
}
