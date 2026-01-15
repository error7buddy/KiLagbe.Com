import React from "react";
import AdvertisementList from "./AdvertisementsList";
import PaymentMethodsCarousel from "../Payment/PaymentMethodsCarousel";
import Review from "./Review";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Houses for Rent</h1>
      <AdvertisementList />
      <br/>
         <br/>
            <br/>   <br/> 
      <PaymentMethodsCarousel />
      <Review />
    </div>
  
  );
}