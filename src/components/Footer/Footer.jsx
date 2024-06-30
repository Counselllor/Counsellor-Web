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
          <li>
            <a 
          style={{ textDecoration: "none", color: "inherit" }}
           href="./blogs">Blog
          </a>
</li>
            <li><a
            style={{ textDecoration: "none", color: "inherit" }}
            href="./help"
          >
            Help
          </a>
          </li>
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
          
            <li>
            <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="./join-us"
          >
              Join Us
              </a>
              </li>
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