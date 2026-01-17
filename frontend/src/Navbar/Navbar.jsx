import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ mobile toggle
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ close mobile menu on route change actions
  const go = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-8 min-w-0">
            <div className="flex-shrink-0 text-xl sm:text-2xl font-bold text-gray-900 truncate">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                কী লাগবে.com?
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link
                to="/advertise"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Advertise
              </Link>
            </div>
          </div>

          {/* Right side - User / Login */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Desktop Shifting */}
            <div className="hidden md:flex">
              <Link
                to="/shifting"
                className="text-base lg:text-xl font-bold text-gray-900 hover:opacity-80 transition whitespace-nowrap"
              >
                🚚পিকআপ লাগবে ?
              </Link>
            </div>

            {/* Desktop auth actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <img
                    src={user.photoURL || "https://i.ibb.co.com/sJjJnc3T/image.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 object-cover"
                    onClick={() => go("/profile")}
                  />

                  <button
                    onClick={handleLogout}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (collapsible) */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              to="/advertise"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              Advertise
            </Link>
            <Link
              to="/shifting"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              🚚 পিকআপ লাগবে ?
            </Link>

            <div className="pt-3 mt-3 border-t">
              {user ? (
                <div className="flex items-center gap-3 px-3">
                  <img
                    src={user.photoURL || "https://i.ibb.co.com/sJjJnc3T/image.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                    onClick={() => go("/profile")}
                  />
                  <div className="flex-1" />
                  <button
                    onClick={handleLogout}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
