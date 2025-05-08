import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import { ThemeContext } from "../../App";
import { Switch } from 'antd';
import "./AboutNavbar.css";

// Toggle menu function
const toggleNavMenu = (setMenuOpen, menuOpen) => {
  setMenuOpen(!menuOpen);
};

const AboutNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fix, setFix] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMenuCallback = useCallback(() => {
    toggleNavMenu(setMenuOpen, menuOpen);
  }, [setMenuOpen, menuOpen]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        toggleMenuCallback();
      }
    },
    [toggleMenuCallback]
  );

  const setFixed = () => {
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);

  return (
    <nav className={`navbar ${fix ? "fixed" : ""}`}>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className={`menu ${menuOpen ? "show" : ""}`}>
        <ul>
          <MenuItem href="/about">About</MenuItem>
          <MenuItem href="/blogs">Blog</MenuItem>
          <MenuItem href="/contribute">Contributors</MenuItem>
          <MenuItem href="/join-us">Join Us</MenuItem>
          <MenuItem href="/help">Help</MenuItem>
          <MenuItem href="/contact">Contact</MenuItem>
          <li>
            <Switch
              style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
              onChange={toggleTheme}
              checked={theme === "dark"}
              checkedChildren="Dark Mode"
              unCheckedChildren="Light Mode"
            />
          </li>
        </ul>
      </div>
      <div
        className="hamburger"
        onClick={toggleMenuCallback}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        role="button"
      >
        {[1, 2, 3].map((index) => (
          <div key={index} className={`bar ${menuOpen ? "open" : ""}`} />
        ))}
      </div>
    </nav>
  );
};

const MenuItem = ({ href, children }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (href) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <li>
      {href ? (
        <a href={href} onClick={handleClick}>{children}</a>
      ) : (
        children
      )}
    </li>
  );
};

export default AboutNavbar;
