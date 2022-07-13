import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase-config";
import Main from "./Main";

export default function RequireAuth() {
  const [user, setUser] = useState({}) as any;
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  return user ? (
    <Main />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
