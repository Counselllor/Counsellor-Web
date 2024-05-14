import "./Footer.css";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <footer>
           
  <div style={{ textAlign: 'left' , paddingLeft:'20px'}}>
  <span style={{ fontSize: '100px' }}>Counsellor.</span>
  </div>
<div className="footer-container">
        <ul >
          <li>Home</li>
          <li>   <a
         style={{ textDecoration: "none", color: "inherit" }}
          href="./about"        >
          About
        </a></li>
          <li>Blog</li>
          <li>Help</li>
          <li>Privacy</li>
        <li>Terms</li>

        <li>
        <a
        style={{ textDecoration: "none", color: "inherit" }}
     href="./contact"
    >             Contact
           </a>
          </li>
        </ul>
       </div>

       <div className="icons">
      <a href="https://github.com/Counselllor/Counsellor-Web" target="_blank" rel="noopener noreferrer">
        <FaGithub className="icon" />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="icon" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="icon" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="icon" />
      </a>
    </div>


    <div className="form">
  <form>
    <input type="text" placeholder="Your Email Here" />
    </form>
    <button>Subscribe to our newsletter</button>

</div>


      </footer>
    </div>
  );
}

export default Footer;
