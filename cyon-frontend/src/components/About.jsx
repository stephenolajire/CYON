import React, { useEffect } from "react";
import styles from "../style/Mission.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import youth from "../assets/youthh.webp";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const About = ({id}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false, 
    });
  }, []);

  return (
    <div className={styles.containers} id={id}>
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
            <Link to="/about">
              <Button content="Learn More" />
            </Link>
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
