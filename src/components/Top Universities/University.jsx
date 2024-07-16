import React, { useCallback, useContext, useEffect, useState } from "react";
import unidata from "./data.json";
import "./university.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {FaTimes} from 'react-icons/fa'
import Logo from "../../assets/logo.webp";
import { auth } from "../../firebase/auth";
import { Switch } from 'antd';
import { signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import { FaGithub, FaInstagram, FaFacebook, FaLinkedin, FaSlack, FaDiscord } from "react-icons/fa";

const University = () => {
  let [isModal,setIsModal]=useState(false)
  function handleOpenModal(){
    setIsModal(true)
    console.log('click')
  }
  function handleCLoseModal(){
    setIsModal(false)
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

const navigate = useNavigate();

let [isLoggedIn,setLogin]=useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // handle user logged in state
        setLogin(true)
      } else {
        
      }
    });
  }, [navigate]);
const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
  <>  <div className="universityPage">
       <nav className={"navbar fixed"}>
    <div className="logo">
      <img src={Logo} alt="Logo" />
    </div>
    <div className={`menu ${menuOpen ? "show" : ""}`}>
      <ul>
        <li><a href="/topuniversities">Top Universities</a></li>
        <li><a href="/jobs">Jobs</a></li>
        <li><a href="./courses">Courses</a></li>
        <li><a href="/careersupport">Career Support</a></li>
        <li className='dot'><a href="error">•</a></li>
        {!isLoggedIn&&  <li><a href="/" onClick={handleSignOut}>Login</a></li>}
      {
isLoggedIn&&<>

       <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
        <li><button className='profile_btn'>Profile</button></li>
     
        <li>
          <Switch
            style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
            onChange={handleThemeChange}
            checked={theme === "dark"}
            checkedChildren="Dark Mode"
            unCheckedChildren="Light Mode"
          />
        </li> </>} 
      </ul>
    </div>
    <div className="hamburger" onClick={toggleMenu}>
      <div className={`bar ${menuOpen ? 'open' : ''}`} />
      <div className={`bar ${menuOpen ? 'open' : ''}`} />
      <div className={`bar ${menuOpen ? 'open' : ''}`} />
    </div>
  </nav> 
      <header className="universityPage-header">
        <h1 className="universityPage-main-title">Top Universities</h1>
        <p className="universityPage-subtitle">Explore exciting Universities</p>
      </header>
      <section className="universityPage-content" style={{zIndex:10}}>
        <div className="universityPage-list">
          {unidata.map((university) => (
            <div key={university.id} className="universityPage-card">
              <h2 className="universityPage-title">{university.name}</h2>
              <h3 className="universityPage-company"><a href={`${university.website}`}>{university.website}</a></h3>
              <p className="universityPage-description" style={{fontSize:"15px"}}><b>Students:</b> {university.students}</p>
              <p className="universityPage-location"  style={{fontSize:"15px"}}><b>Location: </b>{university.location}</p>
            </div>
          ))}
        </div>
      </section>
      <footer id="footer" className="footer-area giving0-colro">
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
    </div>
   </>
  );
};

export default University;
