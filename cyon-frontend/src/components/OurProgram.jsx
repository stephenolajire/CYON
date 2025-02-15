import React, { useContext, useEffect } from "react";
import styles from "../style/OurProgram.module.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import AOS styles
import priest from "../assets/program.webp";
import Button from "../ui/Button";
import { GlobalContext } from "../constant/context/GlobalContext";

const OurProgram = ({id}) => {
  const {fetchProgram, program} = useContext(GlobalContext)
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Ensures the animation runs only once
    });
    fetchProgram()
  }, []);

  return (
    <div id={id} className={styles.outside}>
      <h1 className={styles.program} data-aos="fade-up">
        Our Program
      </h1>
      <div className={styles.contt}>
        <div className={styles.div} data-aos="fade-up">
          <p className={styles.explore}>Explore our Programs</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.cont}>
            <p className={styles.text} data-aos="fade-up">
              {program.date}
            </p>
            <h1 className={styles.header} data-aos="fade-up">
              {program.title}
            </h1>
            <p className={styles.texts} data-aos="fade-up">
              {program.description}
            </p>

            {/* <div className={styles.btnDiv}>
              <Button content="Join Now" />
            </div> */}
          </div>
        </div>
        <div
          className={styles.imageWrapper}
          data-aos="zoom-in"
          style={{
            backgroundImage: `url(${program.image})`, 
            backgroundSize: "cover",
            backgroundPosition: "center", 
          }}
        ></div>
      </div>
    </div>
  );
};

export default OurProgram;
