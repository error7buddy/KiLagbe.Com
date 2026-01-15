import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all ads
  const fetchAds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ads");
      setAds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch all shifting orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/shifting-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAds();
    fetchOrders();
  }, []);

  return (
    <AppContext.Provider
      value={{ ads, setAds, orders, setOrders, fetchAds, fetchOrders }}
    >
      {children}
    </AppContext.Provider>
  );
};
