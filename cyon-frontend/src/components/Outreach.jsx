import React, {useEffect} from "react";
import Button from "../ui/Button";
import styles from "../style/Outreach.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Outreach = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.header} data-aos="fade-up">
        Outreach
      </h1>
      <p className={styles.text} data-aos="fade-up">
        Discover more about our organization, explore upcoming events, learn
        about our community outreach initiatives, and find ways to get involved
        with the Catholic Youth Organizations of Nigeria, St George Ofatedo
      </p>
      <div className={styles.cont} data-aos="fade-up">
        <Link to="outreach">
          <Button content="Explore" />
        </Link>
      </div>
    </div>
  );
};

export default Outreach;
