import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const ADMIN_EMAIL = "admin@example.com"; // 🔴 change to your real admin email

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Normal admin login
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials!");
    }
  };

  // ✅ Google Admin Login
  const handleGoogleAdminLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔐 Only allow admin email
      if (user?.email !== ADMIN_EMAIL) {
        alert("❌ This Google account is not authorized as admin.");
        await signOut(auth); // ✅ keep your important security step
        return;
      }

      localStorage.setItem("isAdmin", "true");
      alert("✅ Admin logged in with Google!");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("❌ Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl shadow-md"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
          Admin Login
        </h2>

        {/* ✅ Trust signal for Google Safe Browsing (no functionality change) */}
        <p className="text-xs text-gray-500 text-center mb-6">
          Restricted to administrators only. Educational university project.
          <br />
          Do not enter personal or banking information.
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin Username
        </label>
        <input
          type="text"
          placeholder="Enter admin username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          required
          disabled={loading}
          autoComplete="username"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin Password
        </label>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          required
          disabled={loading}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mb-3 disabled:opacity-50"
        >
          Login
        </button>

        {/* ✅ Google Admin Login */}
        <button
          type="button"
          onClick={handleGoogleAdminLogin}
          disabled={loading}
          className="w-full border p-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition disabled:opacity-50"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {loading ? "Please wait..." : "Continue with Google"}
        </button>

        <p className="text-[11px] text-gray-500 text-center mt-4">
          © 2024–2025 | University Project – Not a commercial service
        </p>
      </form>
    </div>
  );
};

export default Login;
