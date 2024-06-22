import "./Footer.css";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div>
        <ul>
          <li>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./about"
            >
              About
            </a>
          </li>
          <li>Blog</li>
          <li>Help</li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit"}} href="./privacy-policy">Privacy</a>
          </li>
          <li>Terms</li>
          <li>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./contact"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./contribute"
            >
              Our Contributors
            </a>
          </li>
          <li>Join Us</li>
        </ul>
        <p>© 2023 Counsellor</p>
        <div id="icons">
          <a
            href="https://github.com/Counselllor/Counsellor-Web"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
