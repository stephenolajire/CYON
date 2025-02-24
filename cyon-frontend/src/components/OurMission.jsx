import React, { useEffect } from "react";
import styles from "../style/Mission.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import AOS styles
import priest from "../assets/pp.webp";
import Button from "../ui/Button";

const OurMission = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Ensures the animation runs only once
    });
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.imageWrapper}
        data-aos="zoom-in"
        style={{ backgroundImage: `url(${priest})` }}
      ></div>
      <div className={styles.contentWrapper}>
        <div className={styles.cont}>
          <p className={styles.text} data-aos="fade-up">
            Our Mission
          </p>
          <h1 className={styles.header} data-aos="fade-up">
            Empowering Youth, Nurturing Faith
          </h1>
          <p className={styles.texts} data-aos="fade-up">
            Organizations of Nigeria, St. George Chapter, is dedicated to
            providing a supportive and enriching environment for young people to
            grow in their faith, develop leadership skills, and engage in
            meaningful service to their community <br /> <br />
            Our organization was founded with the mission of fostering
            spiritual growth, promoting community engagement, and empowering
            youth to become positive change-makers The Catholic Youth
          </p>

          {/* <div className={styles.btnDiv}>
            <Button content="Join Us" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OurMission;
