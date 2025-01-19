import React, { useState } from "react";
import styles from '../style/Navigation.module.css'
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/log.jpg';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <img className={styles.logo} src={logo} alt="logo"/>
      </div>

      {/* Navigation Links */}
      <nav className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <a href="#home" className={styles.link}>
          Home
        </a>
        <a href="#about" className={styles.link}>
          About
        </a>
        <a href="#programs" className={styles.link}>
          Programs
        </a>
        <a href="#contact" className={styles.link}>
          Contact
        </a>
        <button className={styles.donateButton}>Donate</button>
      </nav>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
}

export default NavBar;
