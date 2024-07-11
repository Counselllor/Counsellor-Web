import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Joinus.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import BackToHomeButton from "../backtohome";
import Logo from "../../assets/logo.webp";
import { auth } from "../../firebase/auth";
import { Switch } from 'antd';
import { signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../../App";


const JoinUs = () => {
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
    if(localStorage.getItem('login')){

      setLogin(true)
    }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // handle user logged in state
    //   } else {
        
    //   }
    // });
  }, [navigate]);
const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('login')

        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <> 
    <nav className={`navbar fixed`}>
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
  <BackToHomeButton />
    <div>
       
      <div className="join-us-container">
     
      

        <div className="contents">
          <h1>Join Us</h1>
          <section id="benefits">
            <h2>Why Join Our Team?</h2>
            <p>
              At CounsellorsWeb, we are dedicated to fostering a work environment that is inclusive, innovative, and conducive to professional growth. Here are just a few reasons why you should consider joining our team:
            </p>
            <ul>
              <li>Innovative projects and cutting-edge technology</li>
              <li>Collaborative and inclusive work environment</li>
              <li>Opportunities for professional growth</li>
              <li>Competitive salary and benefits</li>
              <li>Flexible working hours and remote work options</li>
              <li>Health and wellness programs</li>
              <li>Ongoing training and development</li>
            </ul>
          </section>

          <section id="culture">
            <h2>Our Culture</h2>
            <p>
              Our company culture is built on mutual respect, continuous learning, and a passion for excellence. We believe that a positive and supportive workplace leads to higher productivity and job satisfaction. Here’s what you can expect when you join us:
            </p>
            <ul>
              <li>Regular team-building activities and events</li>
              <li>Open-door policy with management</li>
              <li>Encouragement of work-life balance</li>
              <li>Diversity and inclusion initiatives</li>
              <li>Community involvement and social responsibility</li>
            </ul>
          </section>

          <section id="testimonials">
            <h2>Employee Testimonials</h2>
            <p>
              Don’t just take our word for it. Here’s what some of our employees have to say about working at CounsellorsWeb:
            </p>
            <blockquote>
              "Working at CounsellorsWeb has been an incredible journey. The collaborative environment and the focus on innovation make every day exciting." – Jane Doe, Software Engineer
            </blockquote>
            <blockquote>
              "The emphasis on continuous learning and professional development has helped me grow both personally and professionally." – John Smith, Project Manager
            </blockquote>
          </section>

          <section id="positions">
            <h2>Open Positions</h2>
            <p>
              We are always looking for talented individuals to join our team. Check out our <Link to="/careers">careers page</Link> for current openings.
            </p>
          </section>

          <section id="apply">
            <h2>How to Apply</h2>
            <p>
              Interested in joining us? Send your resume and a cover letter to <a href="mailto:careers@counsellorsweb.com">careers@counsellorsweb.com</a>. In your cover letter, please include:
            </p>
            <ul>
              <li>A brief introduction about yourself</li>
              <li>Why you are interested in joining CounsellorsWeb</li>
              <li>What you can bring to our team</li>
              <li>Your relevant skills and experience</li>
            </ul>
          </section>
        </div>
      </div>

      <hr />

      <Footer />
    </div>
    </>
  );
};

export default JoinUs;
