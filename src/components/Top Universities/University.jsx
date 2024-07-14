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
      <Footer />
    </div>
   </>
  );
};

export default University;
