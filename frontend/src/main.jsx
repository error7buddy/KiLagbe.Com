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

// Protected route for authenticated users
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return user ? children : <Navigate to="/auth" replace />;
};

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
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
