import React, { useEffect } from "react";
import styles from "../style/Mission.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import AOS styles
import youth from "../assets/youthh.webp";
import Button from "../ui/Button";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Ensures the animation runs only once
    });
  }, []);

  return (
    <div className={styles.containers}>
      <div className={styles.contentWrapper}>
        <div className={styles.cont}>
          <p className={styles.text} data-aos="fade-up">
            About Us
          </p>
          <h1 className={styles.headers} data-aos="fade-up">
            Fostering Spiritual Growth and Community
          </h1>
          <p className={styles.textp} data-aos="fade-up">
            Our Principle
          </p>
          <p className={styles.texts} data-aos="fade-up">
            As a faith-based organization, we believe in the values of
            compassion, service, and moral integrity. Our programs and
            activities are designed to inspire our youth to live out these
          </p>

          <div className={styles.btnDiv}>
            <Button content="Learn More" />
          </div>
        </div>
      </div>
      <div
        className={styles.imageWrappers}
        data-aos="zoom-in"
        style={{ backgroundImage: `url(${youth})` }}
      ></div>
    </div>
  );
};

export default About;
