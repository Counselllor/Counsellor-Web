import React from 'react';
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin, FaSlack, FaDiscord } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer-area">
      <div className="container">
        <div className="footer-widget pb-100">
          <div className="row">

            {/* Intro Column */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-about mt-50">
                <div className='logo'>
                  <img src="/src/assets/logo.webp" alt="logo" className="logo-image"/>
                </div>
                <h1>Counsellor</h1>
                <p className="text">
                  We at Counsellor empower students to explore the right streams, branches, and colleges
                  through personalized insights and honest reviews.
                </p>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-link mt-50">
                <div className="footer-title">
                  <h4 className="title">Quick Links</h4>
                </div>
                <ul className="link">
                  <li><a href="./privacy-policy">Privacy Policy</a></li>
                  <li><a href="./Terms">Terms & Conditions</a></li>
                  <li><a href="./help">Help</a></li>
                  <li><a href="./contact">Contact Us</a></li>
                </ul>
              </div>
            </div>

            {/* Resources Column */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-link mt-50">
                <div className="footer-title">
                  <h4 className="title">Resources</h4>
                </div>
                <ul className="link">
                  <li><a href="/">Home</a></li>
                  <li><a href="./About">About Us</a></li>
                  <li><a href="./blogs">Blog</a></li>
                </ul>
              </div>
            </div>

            {/* Community Column */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-link mt-50">
                <div className="footer-title">
                  <h4 className="title">Community</h4>
                </div>
                <ul className="link mt-3">
                  <li><a href="./contribute">Our Contributors</a></li>
                  <li><p>Connect with Us</p></li>
                </ul>
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
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="copyright d-sm-flex justify-content-between">
              <div className="footer-copyright">
                <p className="text">
                  <span className='line'></span>
                  © {new Date().getFullYear()} Counsellor. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
