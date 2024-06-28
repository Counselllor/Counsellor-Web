import "./Footer.css";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer>
        <section class="newsletter-section">
        <h2>Stay updated with our latest news!</h2>
        <p>Subscribe to our newsletter to receive exclusive updates, promotions, and more.</p>
        <form id="newsletter-form">
            <input type="email" id="email" placeholder="Enter your email address"/>
            <button id="subscribe-btn">Subscribe</button>
        </form>
        <div id="newsletter-response"></div>
        </section>
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
          <li>Privacy</li>
          <li>Terms</li>
          <li>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              href="./contact"
            >
              Contact
            </a>
          </li>
          <li>Our Countributors</li>
          <li>Join Us</li>
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
