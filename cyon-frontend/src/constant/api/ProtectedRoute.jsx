import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
import api from "./api";
import { GlobalContext } from "../context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { openEmailModal, closeEmailModal } = useContext(GlobalContext);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh");
    try {
      const response = await api.post("token/refresh/", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        setIsAuthenticated(true);
        closeEmailModal()
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setIsAuthenticated(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    const decoded = jwtDecode(token);
    const expiryDate = decoded.exp;
    const currentTime = Date.now() / 1000;

    if (currentTime > expiryDate) {
      await refreshToken();
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  // Call authentication on component mount
  useEffect(() => {
    auth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    openEmailModal();
  }

  return children;
};

export default ProtectedRoute;
