import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/auth";
import { signOut } from "firebase/auth";
import { Switch } from "antd";
import './Joinus.css'
import { ThemeContext } from "../../App";
import Logo from "../../assets/logo.webp";
import Footer from "../Footer/Footer";

const JoinUs = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setLogin(true);
    }
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("login");
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={`app ${theme}`}>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? "show" : ""}`}>
            <ul>
              <li><a href="/topuniversities">Top Universities</a></li>
              <li><a href="/jobs">Jobs</a></li>
              <li><a href="./courses">Courses</a></li>
              <li><a href="/careersupport">Career Support</a></li>
              {!isLoggedIn && <li><a href="/" onClick={handleSignOut}>Login</a></li>}
              {isLoggedIn && (
                <>
                  <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
                  <li><button className="profile_btn">Profile</button></li>
                  <li>
                    <Switch
                      onChange={handleThemeChange}
                      checked={theme === "dark"}
                      checkedChildren="Dark"
                      unCheckedChildren="Light"
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? "open" : ""}`} />
            <div className={`bar ${menuOpen ? "open" : ""}`} />
            <div className={`bar ${menuOpen ? "open" : ""}`} />
          </div>
        </div>
      </nav>
      
      <header className="join-us-header">
        <h1>Join Our Team</h1>
        <p>Be part of a dynamic team driving innovation in career counseling</p>
      </header>
      
      <main className="join-us-container">
        <section className="join-us-section">
          <h2>Why CounsellorsWeb?</h2>
          <div className="two-column">
            <div>
              <h3>Innovation & Growth</h3>
              <ul>
                <li>Cutting-edge technology projects</li>
                <li>Continuous learning opportunities</li>
                <li>Career advancement paths</li>
              </ul>
            </div>
            <div>
              <h3>Work-Life Balance</h3>
              <ul>
                <li>Flexible working hours</li>
                <li>Remote work options</li>
                <li>Comprehensive health benefits</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="join-us-section">
          <h2>Our Culture</h2>
          <p>
            At CounsellorsWeb, we foster an environment of collaboration, respect, and excellence. 
            Our team members are passionate about making a difference in education and career development.
          </p>
          <div className="culture-highlights">
            <div>Inclusive workplace</div>
            <div>Innovation-driven</div>
            <div>Continuous learning</div>
            <div>Work-life balance</div>
          </div>
        </section>

        <section className="join-us-section">
          <h2>Employee Testimonials</h2>
          <div className="testimonial">
            <blockquote>
              "CounsellorsWeb has provided me with incredible opportunities for growth. 
              The collaborative environment and focus on innovation make every day exciting."
            </blockquote>
            <cite>- Jane Doe, Software Engineer</cite>
          </div>
        </section>

        <section className="join-us-section">
          <h2>Current Opportunities</h2>
          <p>
            We're always on the lookout for talented individuals to join our team. 
            Check our <Link to="/careers">careers page</Link> for current openings or 
            send your resume to <a href="mailto:careers@counsellorsweb.com">careers@counsellorsweb.com</a>.
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinUs;