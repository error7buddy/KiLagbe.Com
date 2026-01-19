import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials!");
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

        {/* ✅ VERY IMPORTANT TRUST TEXT */}
        <p className="text-xs text-gray-500 text-center mb-6">
          This page is restricted to administrators only.
          <br />
          Part of a university final year project.  
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
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login as Admin
        </button>

        {/* ✅ extra identity info */}
        <p className="text-[11px] text-gray-500 text-center mt-4">
          © 2024–2025 | University Project – Not a commercial service
        </p>
      </form>
    </div>
  );
};

export default Login;
