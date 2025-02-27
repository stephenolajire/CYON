import React, { useEffect, useState } from "react";
import styles from "../style/ContactForm.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../ui/Button";
import api from "../constant/api/api";
import Swal from "sweetalert2";

const ContactForm = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("contact/", formData);
      if (response.status === 201) {
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for reaching out to us. We'll get back to you soon.",
          icon: "success",
          showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`,
          },
          hideClass: {
            popup: `animate__animated animate__fadeOutDown animate__faster`,
          },
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        showClass: {
          popup: `animate__animated animate__fadeInUp animate__faster`,
        },
        hideClass: {
          popup: `animate__animated animate__fadeOutDown animate__faster`,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.header} data-aos="fade-up">
        Contact Us
      </h1>
      <p className={styles.text} data-aos="fade-up">
        Have questions or want to get involved? Reach out to us!
      </p>

      <div className={styles.contactWrapper}>
        {/* Contact Details */}
        <div className={styles.contactDetails} data-aos="fade-right">
          <div className={styles.contactItem}>
            <h2>Our Location</h2>
            <p>
              <i className={`${styles.icon} fas fa-map-marker-alt`}></i>
              St. George Catholic Church, Ofatedo, Nigeria
            </p>
          </div>

          <div className={styles.contactItem}>
            <h2>Email</h2>
            <p>
              <i className={`${styles.icon} fas fa-envelope`}></i>
              <a
                href="mailto:info@cyonstgeorge.com"
                className={styles.contactLink}
              >
                info@cyonstgeorge.com
              </a>
            </p>
          </div>

          <div className={styles.contactItem}>
            <h2>Phone</h2>
            <p>
              <i className={`${styles.icon} fas fa-phone-alt`}></i>
              <a href="tel:+2348101234567" className={styles.contactLink}>
                +234 810 123 4567
              </a>
            </p>
          </div>

          <div className={styles.contactItem}>
            <h2>Follow Us</h2>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className={styles.socialIcon}>
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className={styles.contactForm}
          data-aos="fade-left"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={formErrors.name ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {formErrors.name && (
              <span className={styles.errorMessage}>{formErrors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? styles.inputError : ""}
              disabled={isSubmitting}
            />
            {formErrors.email && (
              <span className={styles.errorMessage}>{formErrors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={formErrors.message ? styles.inputError : ""}
              disabled={isSubmitting}
            ></textarea>
            {formErrors.message && (
              <span className={styles.errorMessage}>{formErrors.message}</span>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <Button
              content={isSubmitting ? "Sending..." : "Send Message"}
              onclick={handleSubmit}
              disabled={isSubmitting}
              className={isSubmitting ? styles.buttonDisabled : ""}
            />
          </div>
        </form>
      </div>

      {/* Google Map Embed */}
      <div className={styles.mapContainer} data-aos="zoom-in">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d4.510773!3d7.769515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSt.%20George%20Catholic%20Church!5e0!3m2!1sen!2sng!4v1640628312345"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactForm;