import React from "react";
import styles from "../style/Button.module.css"; 

const Button = ({ content }) => {
  return (
    <button className={styles.button}>
      {content}
    </button>
  );
};

export default Button;
