import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
