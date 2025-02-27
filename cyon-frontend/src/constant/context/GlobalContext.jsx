import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import { use } from "react";

// Create Context
export const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [program, setProgram] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [loading, setLoading] = useState (false)
  const [outreaches, setOutreaches] = useState([]);

  const [candidates, setCandidates] = useState([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openEmailModal = () => setEmailModalOpen(true);
  const closeEmailModal = () => setEmailModalOpen(false);

  const fetchProgram = async () => {
    setLoading(true)
    try {
      const response = await api.get("program");
      if (response.data) {
        setProgram(response.data);
        setLoading(false)
        // console.log(response.data)
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []);

  const auth = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiryDate = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiryDate > currentTime) {
        setIsAuthenticated(true);
        console.log(isAuthenticated)
        closeEmailModal()
      } else {
        setIsAuthenticated(false); // Token has expired
        localStorage.removeItem("access"); // Optionally remove expired token
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false); // Set as false if decoding fails
    }
  };

  useEffect(() => {
    auth();
  }, []);

  const fetchOutreach = async () => {
    try {
      const response = await api.get("outreach/");
      if (response.data) {
        setOutreaches(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOutreach();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await api.get("candidates");
      setCandidates(response.data);
      console.log(response.data);
      // console.log(response.data.election_id);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        auth,
        isModalOpen,
        openModal,
        candidates,
        closeModal,
        setModalOpen,
        fetchProgram,
        program,
        emailModalOpen,
        openEmailModal,
        closeEmailModal,
        setEmailModalOpen,
        setIsAuthenticated,
        isAuthenticated,
        loading,
        outreaches,
        setCandidates,
        // results,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
