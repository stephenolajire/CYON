import React, { useState } from "react";
import api from "../constant/api/api";
import styles from "../style/Donate.module.css";
import Swal from "sweetalert2";
import visa from "../assets/visa.jpeg";
import mastercard from "../assets/mastercard.jpeg";
import bank from "../assets/verve.jpeg";

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
  const [step, setStep] = useState(1);

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

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    } else {
      Swal.fire({
        title: "Validation Error",
        text: "Please check all fields and try again",
        icon: "error",
      });
    }
  };

  const handleBack = () => {
    setStep(1);
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

  const renderPaymentIcons = () => (
    <div className={styles.paymentMethods}>
      <div className={styles.paymentIcon}>
        <img src={visa} alt="Visa" />
      </div>
      <div className={styles.paymentIcon}>
        <img src={mastercard} alt="Mastercard" />
      </div>
      <div className={styles.paymentIcon}>
        <img src={bank} alt="Bank Transfer" />
      </div>
    </div>
  );

  const suggestedAmounts = [1000, 5000, 10000, 25000];

  return (
    <div className={styles.donationContainer}>
      <div className={styles.donationCard}>
        <div className={styles.donationHeader}>
          <h2>Support Our Mission</h2>
          <p>Your generosity helps us make a difference in our community</p>
          {renderPaymentIcons()}
        </div>

        {step === 1 ? (
          <form className={styles.form}>
            <div className={styles.formSection}>
              <h3>Donation Amount</h3>
              <div className={styles.suggestedAmounts}>
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`${styles.amountButton} ${
                      Number(formData.amount) === amount
                        ? styles.amountButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: amount.toString(),
                      }))
                    }
                  >
                    ₦{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="amount">Custom Amount (₦)</label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
                {errors.amount && (
                  <span className={styles.error}>{errors.amount}</span>
                )}
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>Personal Information</h3>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="firstname">First Name</label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstname && (
                    <span className={styles.error}>{errors.firstname}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastname && (
                    <span className={styles.error}>{errors.lastname}</span>
                  )}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  id="phonenumber"
                  type="tel"
                  name="phonenumber"
                  placeholder="Enter your phone number"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                />
                {errors.phonenumber && (
                  <span className={styles.error}>{errors.phonenumber}</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className={styles.submitButton}
            >
              Continue to Review
            </button>
          </form>
        ) : (
          <div className={styles.reviewSection}>
            <h3>Review Your Donation</h3>
            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span>Amount:</span>
                <span className={styles.summaryHighlight}>
                  ₦{Number(formData.amount).toLocaleString()}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Name:</span>
                <span>
                  {formData.firstname} {formData.lastname}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span>Email:</span>
                <span>{formData.email}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phone:</span>
                <span>{formData.phonenumber}</span>
              </div>
            </div>
            <div className={styles.secureNotice}>
              <div className={styles.secureIcon}>🔒</div>
              <p>Your payment information is securely processed by Paystack</p>
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleBack}
                className={styles.backButton}
              >
                Edit Information
              </button>
              <button
                type="button"
                onClick={handleDonate}
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? (
                  <span className={styles.loader}>Processing...</span>
                ) : (
                  "Complete Donation"
                )}
              </button>
            </div>
          </div>
        )}

        <div className={styles.donationFooter}>
          <p>
            Thank you for supporting CYON St George. Your donation makes a real
            impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donation;
