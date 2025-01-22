import React, { useContext, useState } from "react";
import styles from "../style/Navigation.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/log.jpg";
import { Link } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
import { GlobalContext } from "../constant/context/GlobalContext";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { program } = useContext(GlobalContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <a href="#about" className={styles.link}>
          About
        </a>
        <a href="#programs" className={styles.link}>
          Programs
        </a>
        <a href="#contact" className={styles.link}>
          Contact
        </a>
        <Link to="donate">
          <button className={styles.donateButton}>Donate</button>
        </Link>
      </nav>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
}

export default NavBar;
