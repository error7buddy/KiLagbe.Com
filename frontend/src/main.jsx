import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "./App";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Advertise_home from "./Components/Advertise/Advertise_home";
import AuthForm from "./Components/Auth/AuthForm";
import Login from "./Components/Auth/Login";
import AdminPage from "./Components/Admin/AdminPage";
import Shifting from "./Components/Shifting/Shifting";
import BookShifting from "./Components/Shifting/BookShifting";

import { AppProvider } from "./Context/AppContext";
import { auth } from "./Firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./Navbar/Profile";
import EditAd from "./Pages/EditAd";

// ✅ Static public pages
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import Contact from "./Pages/Contact";

// 🔒 Protected route
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return user ? children : <Navigate to="/auth" replace />;
};

// 🌐 Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      // ✅ Main pages
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },

      // ✅ Public pages
      { path: "privacy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms /> },
      { path: "contact", element: <Contact /> },

      // 🔒 Protected pages
      {
        path: "advertise",
        element: (
          <ProtectedRoute>
            <Advertise_home />
          </ProtectedRoute>
        ),
      },

      { path: "shifting", element: <Shifting /> },
      { path: "book-shifting/:id", element: <BookShifting /> },

      { path: "auth", element: <AuthForm /> },
      { path: "login", element: <Login /> },
      { path: "admin", element: <AdminPage /> },

      { path: "profile", element: <Profile /> },

      {
        path: "edit-ad/:id",
        element: (
          <ProtectedRoute>
            <EditAd />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
