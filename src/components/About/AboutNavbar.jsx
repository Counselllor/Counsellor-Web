import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import { ThemeContext } from "../../App";
import { Switch } from 'antd';
import "./AboutNavbar.css";

const AboutNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`about-navbar ${scrolled ? "scrolled" : ""}`} id={theme}>
      <div className="about-navbar__container">
        {/* Logo */}
        <div className="about-navbar__logo">
          <Link to="/">
            <img src={Logo} alt="Counsellor Logo" />
            <span>Counsellor</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="about-navbar__mobile-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation links - now in the center */}
        <div className={`about-navbar__links ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blogs">Blog</Link>
            </li>
            <li>
              <Link to="/contribute">Contributors</Link>
            </li>
            <li>
              <Link to="/join-us">Join Us</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className={`about-navbar__actions ${menuOpen ? "active" : ""}`}>
          <div className="theme-toggle">
            <Switch
              style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
              onChange={toggleTheme}
              checked={theme === "dark"}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>
          <Link to="/login" className="login-btn">Log In</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default AboutNavbar;
