import "./Footer.css"
import { useState,useEffect } from "react";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer(){
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Update the current year whenever the component mounts
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
   
    return <footer>
           <div>
            <ul>
                <li>About</li>
                <li>Blog</li>
                <li>Help</li>
                <li>Privacy</li>
                <li>Terms</li>
                <li>Contact</li>
                <li>Our Countributors</li>
                <li>Join Us</li>
            </ul>
            <p className="footer_text"> Copyrith © {currentYear} Counsellor</p>
            <p className="footer_text">All Rights Reserved</p>
            <div id="icons">
               <a href="https://github.com/Counselllor/Counsellor-Web" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
  <FaGithub />
</a>

                <FaInstagram />
                <FaLinkedin />
            </div>
           </div>
    </footer>
}

export default Footer;
