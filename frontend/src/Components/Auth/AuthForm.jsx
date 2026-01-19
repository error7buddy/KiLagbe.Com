// src/Navbar/AuthForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import DEFAULT_PROFILE_IMAGE from "./profile_img.jpg";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "admin123";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.confirmPassword.trim())
        newErrors.confirmPassword = "Please confirm password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Google Login (same behavior)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // ✅ ensure photoURL exists (safe default)
      if (result.user && !result.user.photoURL) {
        await updateProfile(result.user, { photoURL: DEFAULT_PROFILE_IMAGE });
      }

      alert("✅ Logged in with Google!");
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error?.code, error?.message);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        // ✅ Admin login (same behavior)
        if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
          localStorage.setItem("isAdmin", "true");
          alert("✅ Admin logged in!");
          navigate("/admin");
          return;
        }

        // ✅ Normal user login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert("✅ Logged in successfully!");
        navigate("/home");
      } else {
        // ✅ Register user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        // ✅ Set safe default profile picture (not ibb)
        await updateProfile(user, { photoURL: DEFAULT_PROFILE_IMAGE });

        // ✅ logout after registration (same behavior)
        await signOut(auth);

        // ✅ Redirect to login
        alert("🎉 Registration successful! Please log in.");
        setIsLogin(true);
        setFormData({ email: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      console.error("Auth error:", error?.code, error?.message);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-5 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
            {isLogin ? "Sign In" : "Sign Up"}
          </h1>

          {/* ✅ IMPORTANT: Google Safe Browsing trust text (no functionality change) */}
          <p className="text-xs text-gray-500 text-center mb-5">
            Educational university project. Login is only used to post ads and book shifting services.
            Please do not share sensitive information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {errors.submit && <p className="text-red-600 text-sm">{errors.submit}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-black text-white rounded-md hover:bg-white hover:text-black border transition disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* ✅ Google button (keeps your UI) */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full mt-3 py-2.5 px-4 border rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition disabled:opacity-50"
          >
            {/* Safer to keep local asset during review; if you want, replace with local logo later */}
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <p className="text-center text-sm mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-black font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>

          {/* ✅ More trust signals for Google (no functional change) */}
          <p className="text-[11px] text-gray-500 text-center mt-4">
            By continuing you agree to our{" "}
            <a className="underline hover:text-black" href="/terms">
              Terms
            </a>{" "}
            and{" "}
            <a className="underline hover:text-black" href="/privacy">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
