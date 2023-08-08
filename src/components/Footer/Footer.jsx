import "./Footer.css"
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer(){
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
            <p>© 2023 Counsellor</p>
            <div id="icons">
               <a href="https://github.com/Counselllor/Counsellor-Web" target="_blank"><FaGithub /></a> 
                <FaFacebook />
                <FaInstagram />
                <FaLinkedin />
            </div>
           </div>
    </footer>
}

export default Footer;
