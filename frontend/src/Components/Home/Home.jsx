import React from "react";
import AdvertisementList from "./AdvertisementsList";
import PaymentMethodsCarousel from "../Payment/PaymentMethodsCarousel";
import Review from "./Review";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
        Available Houses for Rent
      </h1>

      {/* Ads */}
      <AdvertisementList />

      {/* Payment Methods */}
      <div className="mt-10 sm:mt-14 lg:mt-20">
        <PaymentMethodsCarousel />
      </div>

      {/* Reviews */}
      <div className="mt-10 sm:mt-14 lg:mt-20">
        <Review />
      </div>
    </div>
  );
}
