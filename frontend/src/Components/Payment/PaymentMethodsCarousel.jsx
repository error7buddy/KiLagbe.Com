import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bkash from "../Payment/bkash.png";
import nagad from "../Payment/nagad.png";
import rocket from "../Payment/rocket.png";




const paymentMethods = [
  {
    id: 1,
    name: "Visa",
    description: "Demo payment option (no real transactions).",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  },
  {
    id: 2,
    name: "Mastercard",
    description: "Demo payment option (no real transactions).",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  },
  {
    id: 3,
    name: "PayPal",
    description: "Demo payment option (no real transactions).",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    id: 4,
    name: "Google Pay",
    description: "Demo payment option (no real transactions).",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/960px-Google_Pay_Logo.svg.png?20221017164555",
  },
  {
    id: 5,
    name: "Apple Pay",
    description: "Demo payment option (no real transactions).",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: 6,
    name: "bKash",
    description: "Demo payment option for this university project.",
    logo: bkash,
  },
  {
    id: 7,
    name: "Nagad",
    description: "Demo payment option for this university project.",
    logo: nagad,
  },
  {
    id: 8,
    name: "Rocket",
    description: "Demo payment option for this university project.",
    logo: rocket,
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
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-gradient-to-b from-gray-50 to-white rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-3">
        💳 Payment Methods (Demo)
      </h2>

      {/* ✅ Trust / Anti-phishing disclaimer (no functionality change) */}
      <p className="text-xs text-gray-600 text-center mb-8 sm:mb-10">
        Educational project — this section is a demo. No real payments are processed.
      </p>

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
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {method.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-2 min-h-[3rem] sm:min-h-[3.5rem]">
                {method.description}
              </p>

              {/* ✅ Button text adjusted to avoid “real payment” wording */}
              <button className="mt-5 sm:mt-6 w-full bg-black text-white py-2.5 rounded-lg hover:bg-white hover:text-black border border-black transition">
                Select {method.name}
              </button>
            </div>
          </div>
        ))}
      </Slider>

      <div className="h-8 sm:h-12 lg:h-16" />
    </div>
  );
}
