import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../Firebase/config";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking session...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default PrivateRoute;
