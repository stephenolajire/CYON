import React, { useContext, useState } from "react";
import Modal from "react-modal";
import styles from "../style/RegistrationModal.module.css";
import { GlobalContext } from "../constant/context/GlobalContext";
import api from "../constant/api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Bind modal to your app element for accessibility
Modal.setAppElement("#root");

const EmailModal = () => {
  const { closeEmailModal, emailModalOpen, openModal, auth } =
    useContext(GlobalContext);
  const navigate = useNavigate(); // Corrected declaration of navigate
  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Loading state for button
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await api.post("token/", formData);
      if (response.status === 200) {
        const access = response.data.access;
        const refresh = response.data.refresh;
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        Swal.fire({
          title: "Validated!",
          text: "Pls go and cast your vote !.",
          icon: "success",
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
            `,
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `,
          },
        });
        closeEmailModal();
        setFormData({
          email: "",
          password: "", 
        });
        auth()
        navigate("vote");
      }
    } catch (error) {
      Swal.fire({
        title: "Validation Failed!",
        icon: "error",
        text:
          error.response?.data?.message || "You are not a registered member.",
        showClass: {
          popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
            `,
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `,
        },
      });
      closeEmailModal();
      openModal();
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Modal
      isOpen={emailModalOpen}
      onRequestClose={closeEmailModal}
      className={styles.modals}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.header}>Validation Form</h2>
      <p className={styles.fill} style={{ lineHeight: "2.5rem" }}>
        Pls provide your email address for validation to be able to vote
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Other form inputs */}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <div className={styles.spinner}></div> // Spinner while loading
          ) : (
            "Submit"
          )}
        </button>
      </form>
      <button onClick={closeEmailModal} className={styles.closeButtons}>
        Close
      </button>
    </Modal>
  );
};

export default EmailModal;
