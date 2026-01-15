import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../Firebase/config";

const RootRedirect = () => {
  const user = auth.currentUser;
  const isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin) return <Navigate to="/admin" replace />;
  if (user) return <Navigate to="/home" replace />;
  return <Navigate to="/auth" replace />;
};

export default RootRedirect;
