import React from "react";
import AdvertisementList from "./AdvertisementsList";
import PaymentMethodsCarousel from "../Payment/PaymentMethodsCarousel";
import Review from "./Review";
import PaidPromotion from "./PaidPromotion";

export default function Home() {
  return (
    <div className="mt-16 sm:mt-20 px-3 sm:px-6">
      <div className="max-w-15xl mx-auto grid grid-cols-12 gap-4 lg:gap-6">

        {/* LEFT SIDEBAR (shows from lg and up) */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 mr-10">
          <PaidPromotion />
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-12 lg:col-span-9 xl:col-span-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
            Available Houses for Rent
          </h1>

          {/* Ads */}
          <AdvertisementList />

          {/* Tablet promo (md only) to “fill gap” since sidebars are hidden */}
          <div className="hidden md:block lg:hidden mt-10">
            <PaidPromotion />
          </div>

          {/* Payment Methods */}
          <div className="mt-10 sm:mt-14 lg:mt-20">
            <PaymentMethodsCarousel />
          </div>

          {/* Reviews */}
          <div className="mt-10 sm:mt-14 lg:mt-20">
            <Review />
          </div>
        </main>

        {/* RIGHT SIDEBAR (shows from xl and up) */}
        <aside className="hidden xl:block xl:col-span-2">
          <PaidPromotion />
        </aside>

      </div>
    </div>
  );
}
