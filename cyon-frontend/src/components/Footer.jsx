import React from "react";
import styles from "../style/Footer.module.css";
import logo from "../assets/log.jpg"; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo and Copyright */}
        <div className={styles.logoSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        {/* Quick Links */}
        <div className={styles.linksSection}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#programs">Programs</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Get Involved */}
        <div className={styles.linksSection}>
          <h4>Get Involved</h4>
          <ul>
            <li>
              <a href="#volunteer">Volunteer</a>
            </li>
            <li>
              <a href="#donate">Donate</a>
            </li>
            <li>
              <a href="#events">Events</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className={styles.linksSection}>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="#facebook">Facebook</a>
            </li>
            <li>
              <a href="#twitter">Twitter</a>
            </li>
            <li>
              <a href="#instagram">Instagram</a>
            </li>
            <li>
              <a href="#youtube">YouTube</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
