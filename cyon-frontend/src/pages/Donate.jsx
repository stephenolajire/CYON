import React, { useState } from "react";
import api from "../constant/api/api";
import style from "../style/Donate.module.css";
import Swal from "sweetalert2";

const Donation = () => {
  const initialState = {
    email: "",
    amount: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation
    if (!formData.phonenumber.match(/^\d{11}$/)) {
      newErrors.phonenumber = "Please enter a valid 11-digit phone number";
    }

    // Amount validation
    if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    // Name validation
    if (formData.firstname.length < 2) {
      newErrors.firstname = "First name must be at least 2 characters";
    }
    if (formData.lastname.length < 2) {
      newErrors.lastname = "Last name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: "Validation Error",
        text: "Please check all fields and try again",
        icon: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("paystack/donate/", formData);

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      Swal.fire({
        title: "Payment Failed!",
        text:
          error.response?.data?.error ||
          "Something went wrong, please try again",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={style.form} onSubmit={handleDonate}>
      <div className={style.formContainer}>
        <h2>Make a Donation</h2>

        <div className={style.inputGroup}>
          <input
            type="text"
            name="firstname"
            placeholder="Enter your Firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          {errors.firstname && (
            <span className={style.error}>{errors.firstname}</span>
          )}
        </div>

        <div className={style.inputGroup}>
          <input
            type="text"
            name="lastname"
            placeholder="Enter your Lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          {errors.lastname && (
            <span className={style.error}>{errors.lastname}</span>
          )}
        </div>

        <div className={style.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}
        </div>

        <div className={style.inputGroup}>
          <input
            type="tel"
            name="phonenumber"
            placeholder="Enter your phone number"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
          {errors.phonenumber && (
            <span className={style.error}>{errors.phonenumber}</span>
          )}
        </div>

        <div className={style.inputGroup}>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          {errors.amount && (
            <span className={style.error}>{errors.amount}</span>
          )}
        </div>

        <button type="submit" disabled={loading} className={style.submitButton}>
          {loading ? (
            <span className={style.loader}>Processing...</span>
          ) : (
            "Donate Now"
          )}
        </button>
      </div>
    </form>
  );
};

export default Donation;
