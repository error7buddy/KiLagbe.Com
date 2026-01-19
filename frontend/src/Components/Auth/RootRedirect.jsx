import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut, // ✅ add this
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

        // ✅ IMPORTANT: logout unauthorized Google user
        await signOut(auth);

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
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          required
          disabled={loading}
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
          className="w-full border p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition disabled:opacity-50"
        >
          <span className="text-lg">G</span>
          {loading ? "Please wait..." : "Continue with Google"}
        </button>
      </form>
    </div>
  );
};

export default Login;
