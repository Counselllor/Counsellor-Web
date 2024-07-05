import React from 'react';
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin, FaSlack, FaDiscord } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer-area">
      <div className="container">
        <div className="link-container">
          <ul className="link">
            <li><a href="/">Home</a></li>
            <li><a href="./About">About Us</a></li>
            <li><a href="./blogs">Blog</a></li>
            <li><a href="./contribute">Our Contributors</a></li>
            <li><a href="./join-us">Join Us</a></li>
            <li><a href="./help">Help</a></li>
            <li><a href="./contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <ul className="link-2">
            <li><a href="./Terms">Terms & Conditions</a></li>
            <li><a href="./privacy-policy">Privacy Policy</a></li>
          </ul>
          <div className="footer-copyright">
            <p className="text">
              <span className='line'></span>
              © {new Date().getFullYear()} from Counsellor
            </p>
          </div>
          <ul className="social-icons">
            <li><a href="https://github.com/Counselllor/Counsellor-Web" target="_blank" rel="noreferrer"><FaGithub /></a></li>
            <li><a href="https://discord.com" target="_blank" rel="noreferrer"><FaDiscord /></a></li>
            <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagram /></a></li>
            <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FaFacebook /></a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a></li>
            <li><a href="https://slack.com" target="_blank" rel="noreferrer"><FaSlack /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;