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
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/960px-Google_Pay_Logo.svg.png?20221017164555",
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
    logo: "/logos/1656227518bkash-logo-png.png",
  },
  {
    id: 7,
    name: "Nagad",
    description: "Fast and secure payments via Nagad account.",
    logo: "/logos/Nagad_Logo_horizontally_og.png",
  },
  {
    id: 8,
    name: "Rocket",
    description: "Pay with Rocket (Dutch-Bangla Mobile Banking).",
    logo: "/logos/dutch-bangla-rocket-logo-png_seeklogo-317692.png",
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
    autoplaySpeed: 2500, // ✅ still autoplay, but readable on mobile
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, arrows: false }, // nicer on phones
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-8 sm:mb-10">
        💳 Choose Your Payment Method
      </h2>

      <Slider {...settings}>
        {paymentMethods.map((method) => (
          <div key={method.id} className="px-2 sm:px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center text-center p-5 sm:p-6 hover:shadow-xl transition duration-300 h-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center mb-4">
                <img
                  src={method.logo}
                  alt={method.name}
                  className="object-contain max-h-16 sm:max-h-20"
                  loading="lazy"
                />
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {method.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-2 min-h-[3rem] sm:min-h-[3.5rem]">
                {method.description}
              </p>

              <button className="mt-5 sm:mt-6 w-full bg-black text-white py-2.5 rounded-lg hover:bg-white hover:text-black border border-black transition">
                Use {method.name}
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {/* Spacer for next section (responsive instead of <br />) */}
      <div className="h-8 sm:h-12 lg:h-16" />
    </div>
  );
}
