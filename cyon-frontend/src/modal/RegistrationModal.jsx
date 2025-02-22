import React, { useContext, useState } from "react";
import Modal from "react-modal";
import styles from "../style/RegistrationModal.module.css";
import { GlobalContext } from "../constant/context/GlobalContext";
import api from "../constant/api/api";
import Swal from "sweetalert2";

// Bind modal to your app element for accessibility
Modal.setAppElement("#root");

const RegistrationModal = () => {
  const { closeModal, isModalOpen } = useContext(GlobalContext);

  // Form data state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone_number: "",
    house_address: "",
    state: "",
    local_govt: "",
    marital_status: "",
    password: "",
    cpassword: "",
    education: "",
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
      const response = await api.post("signup/", formData);
      if (response.status === 201) {
        Swal.fire({
          title: "Registration Successful!",
          text: "Thank you for joining our Community.",
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
        closeModal();
        setFormData({
          first_name: "",
          last_name: "",
          middle_name: "",
          email: "",
          phone_number: "",
          house_address: "",
          state: "",
          local_govt: "",
          marital_status: "",
          password: "",
          cpassword: "",
          education: "",
        });
      } 
      else if (response.status === 400){
        Swal.fire({
          title: "Email already exit!",
          text: "Please login to vote.",
          icon: "error",
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
      };
    } catch (error) {
      Swal.fire({
        title: "Registration Failed!",
        icon: "error",
        text:
          error.response?.data?.message?.password ||
          "An error occurred. Please try again.",
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
      console.log(error.response.message)
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.header}>Registration Form</h2>
      <p className={styles.fill}>
        Please fill all the information to join the Youth
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Other form inputs */}
        <div className={styles.inputGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>
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
        <div className={styles.inputGroup}>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="house_address">House Address</label>
          <input
            type="text"
            id="house_address"
            name="house_address"
            value={formData.house_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="state">Residential State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="local_govt">Local Government</label>
          <input
            type="text"
            id="local_govt"
            name="local_govt"
            value={formData.local_govt}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="marital_status">Marital Status</label>
          <select
            id="marital_status"
            name="marital_status"
            value={formData.marital_status}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="education">Education Level</label>
          <select
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Tertiary">Tertiary</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Masters</option>
            <option value="Phd">PhD</option>
          </select>
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
      <button onClick={closeModal} className={styles.closeButton}>
        Close
      </button>
    </Modal>
  );
};

export default RegistrationModal;
