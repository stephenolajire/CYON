import React, { useContext } from "react";
import church from "../assets/churchh.avif";
import styles from "../style/Hero.module.css";
import Button from "../ui/Button";
import { GlobalContext } from "../constant/context/GlobalContext";

const Hero = () => {
  const {openModal} = useContext(GlobalContext)
  return (
    <section
      className={styles.heroSection}
      style={{ backgroundImage: `url(${church})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.cont}>
            <h1 className={styles.heroTitle}>
              Welcome to the <br /> Catholic Youth Organizations of Nigeria, <br /> St
              George Ofatedo Chapter
            </h1>
          </div>
          <div className={styles.btnCont}>
            <Button content="Get Involved" onclick={openModal}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
