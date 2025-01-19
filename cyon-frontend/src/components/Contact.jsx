import React, { useEffect } from "react";
import styles from "../style/Mission.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import AOS styles
import contact from "../assets/contact.webp";
import Button from "../ui/Button";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Ensures the animation runs only once
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.cont}>
          <p className={styles.text} data-aos="fade-up">
            Contact Us
          </p>
          <h1 className={styles.header} data-aos="fade-up">
            Reach Out and Get Involved
          </h1>
          <p className={styles.texts} data-aos="fade-up">
            We welcome inquiries from youth, parents, and community members who
            are interested in learning more about our
          </p>

          <div className={styles.btnDiv}>
            <Button content="Inquire Now" />
          </div>
        </div>
      </div>
      <div
        className={styles.imageWrapper}
        data-aos="zoom-in"
        style={{ backgroundImage: `url(${contact})` }}
      ></div>
    </div>
  );
};

export default Contact;
