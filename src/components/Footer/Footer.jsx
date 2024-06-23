import "./Footer.css";
import { FaInfoCircle, FaBlog, FaQuestionCircle, FaShieldAlt, FaFileContract, FaEnvelope, FaGithub, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div>
        <ul>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./about">
              <FaInfoCircle /> About
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./blog">
              <FaBlog /> Blog
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./help">
              <FaQuestionCircle /> Help
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./privacy">
              <FaShieldAlt /> Privacy
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./terms">
              <FaFileContract /> Terms
            </a>
          </li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="./contact">
              <FaEnvelope /> Contact
            </a>
          </li>
          <li>Our Contributors</li>
          <li>Join Us</li>
        </ul>
        <p>© 2023 Counsellor</p>
        <div id="icons">
          <a href="https://github.com/Counselllor/Counsellor-Web" target="_blank" rel="noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;