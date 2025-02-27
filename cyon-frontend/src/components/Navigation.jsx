import React, { useContext, useState } from "react";
import styles from "../style/Navigation.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/log.jpg";
import { Link } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
import { GlobalContext } from "../constant/context/GlobalContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { program, isAuthenticated, setIsAuthenticated, auth } = useContext(GlobalContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
    setIsAuthenticated(false);
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
        <Link to="about" className={styles.link}>
          About
        </Link>
        <a href="#programs" className={styles.link}>
          Programs
        </a>
        <Link to="contact" className={styles.link}>
          Contact
        </Link>
        <Link to="donate">
          <button className={styles.donateButton}>Donate</button>
        </Link>

        {isAuthenticated && (
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        )}
      </nav>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
}

export default NavBar;
