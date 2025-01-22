import React from "react";
import styles from "../style/Button.module.css"; 

const Button = ({ content, onclick }) => {
  return (
    <button className={styles.button} onClick={onclick}>
      {content}
    </button>
  );
};

export default Button;
