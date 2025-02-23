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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post("contact/", formData)
        if (response.status === 201) {
            Swal.fire({
                title: "Message Sent!",
                text: "Thank you for reaching out to us.",
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
        }
    } catch (error) {
        Swal.fire({
            title: "Error!",
            text: "An error occurred. Please try again later.",
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
          <h2>Our Location</h2>
          <p>St. George Catholic Church, Ofatedo, Nigeria</p>
          <h2>Email</h2>
          <p>info@cyonstgeorge.com</p>
          <h2>Phone</h2>
          <p>+234 810 123 4567</p>
          <h2>Follow Us</h2>
          <div className={styles.socialLinks}>
            <a href="#">Facebook</a> | <a href="#">Instagram</a> |{" "}
            <a href="#">Twitter</a>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className={styles.contactForm}
          data-aos="fade-left"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <Button content="Send Message" onclick={handleSubmit}/>
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
        ></iframe>
      </div>
    </div>
  );
};

export default ContactForm;
