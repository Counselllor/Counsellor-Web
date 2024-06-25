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
          <li><a 
          style={{ textDecoration: "none", color: "inherit" }}
          href="/">Blog</a></li>
          <li><a 
          style={{ textDecoration: "none", color: "inherit" }}
          href="/">Help</a></li>
          <li>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./privacy-policy"
            >
              Privacy
            </a>
          </li>
          <li>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./terms"
            >
              Terms
            </a>
          </li>
          <li>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./contact"
            >
              Contact
            </a>
          </li>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="./join-us"
          >
            <li>
              <a 
              style={{ textDecoration: "none", color: "inherit" }}
              href="/">Join Us</a></li>
          </a>
          <li>
            <a
              style={{display:"flex", justifyContent:"center", textDecoration: "none", color: "inherit" }}
              href="./contribute"
            >
              Our Contributors
            </a>
          </li>
        </ul>
        <p>© {new Date().getFullYear()} Counsellor</p>
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
