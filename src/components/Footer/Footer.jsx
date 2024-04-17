import "./Footer.css";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer({ color }) {
  return (
    <footer>
      <div className="footer" style={{ backgroundColor: color }}>
        <ul>
          <li className="link">
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./about"
            >
              About
            </a>
          </li>
          <li className="link">Blog</li>
          <li className="link">Help</li>
          <li className="link">Privacy</li>
          <li className="link">Terms</li>
          <li className="link">
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./contact"
            >
              Contact
            </a>
          </li>
          <li className="link">Our Countributors</li>
          <li className="link">Join Us</li>
        </ul>
        <p>© 2023 Counsellor</p>
        <div id="icons">
          <a
            href="https://github.com/Counselllor/Counsellor-Web"
            target="_blank"
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
