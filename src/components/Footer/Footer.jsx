import React, { useContext } from "react";
import "./Footer.css";
import {
  FaInfoCircle,
  FaBlog,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin
} from 'react-icons/fa';
import { ThemeContext } from '../../App';

function Footer() {
  const { theme } = useContext(ThemeContext);
  const iconColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <footer>
      <div>
        <ul>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./about">
              <FaInfoCircle color={iconColor} /> About
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./blog">
              <FaBlog color={iconColor} /> Blog
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./help">
              <FaQuestionCircle color={iconColor} /> Help
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./privacy">
              <FaShieldAlt color={iconColor} /> Privacy
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./terms">
              <FaFileContract color={iconColor} /> Terms
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./contact">
              <FaEnvelope color={iconColor} /> Contact
            </a>
          </li>
          <li>Our Contributors</li>
          <li>Join Us</li>
        </ul>
        <p>© 2023 Counsellor</p>
        <div id="icons">
          <a href="https://github.com/Counselllor/Counsellor-Web" target="_blank" rel="noreferrer">
            <FaGithub color={iconColor} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook color={iconColor} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram color={iconColor} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin color={iconColor} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
