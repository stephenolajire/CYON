import React, { useEffect } from "react";
import styles from "../style/Mission.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import AOS styles
import priest from '../assets/priest.avif'
import Button from "../ui/Button";

const Mission = () => {
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
            Discover our mission
          </p>
          <h1 className={styles.header} data-aos="fade-up">
            Empowering Youth Through Faith, Community
          </h1>
          <p className={styles.texts} data-aos="fade-up">
            At the Catholic Youth Organizations of Nigeria, St. George Chapter,
            we are committed to nurturing the spiritual, intellectual, and
            social development of young people in our community.
          </p>

          <div className={styles.btnDiv}>
            <Button content="Join Now" />
          </div>
        </div>
      </div>
      <div
        className={styles.imageWrapper}
        data-aos="zoom-in"
        style={{ backgroundImage: `url(${priest})` }}
      ></div>
    </div>
  );
};

export default Mission;
