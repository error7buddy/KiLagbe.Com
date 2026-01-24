import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />

      {/* ✅ Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
