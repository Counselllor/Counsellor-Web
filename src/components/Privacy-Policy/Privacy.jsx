import React, { useState, useEffect, useCallback, useContext } from "react";
import "./Privacy.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { Switch } from "antd";
import { ThemeContext } from "../../App";
import Logo from "../../assets/logo.webp";
import "../../assets/logo.webp"; 
import "../../components/Navbar/Navbar.css"; 

const Privacy = () => {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setLogin] = useState(localStorage.getItem('login'));

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('login');
        setLogin(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      const dayOfWeek = currentDate.getDay();
      const daysSinceLastUpdate = (dayOfWeek + 1) % 7;
      const lastUpdated = new Date(currentDate);
      lastUpdated.setDate(currentDate.getDate() - daysSinceLastUpdate);
      const formattedDate = lastUpdated.toLocaleDateString("en-GB");
      setLastUpdatedDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 7 * 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="navbar fixed">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li><Link to="/topuniversities">Top Universities</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/careersupport">Career Support</Link></li>
            <li className='dot'><Link to="error">•</Link></li>
            {!isLoggedIn ? (
              <li><Link to="/" onClick={handleSignOut}>Login</Link></li>
            ) : (
              <>
                <li><Link to="/" onClick={handleSignOut}>Log Out</Link></li>
                <li><button className='profile_btn'>Profile</button></li>
                <li>
                  <Switch
                    onChange={handleThemeChange}
                    checked={theme === "dark"}
                    checkedChildren="Dark Mode"
                    unCheckedChildren="Light Mode"
                  />
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>
      </nav>

      <div className="main">
        <div className="privacy-policy-container">
          <div className="privacy-policy-content">
            <h1>Privacy Policy</h1>
            <p className="date">
              Last updated: <span style={{ color: "blue" }}>{lastUpdatedDate}</span>
            </p>
            <p>
              This Privacy Policy describes our policies and procedures on the
              collection, use, and disclosure of your information when you use the
              service and tells you about your privacy rights and how the law
              protects you.
            </p>
            <h2 className="title">Interpretation and Definitions</h2>
            <h3 className="sub-title">Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>
            <h3 className="sub-title">Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul className="definitions-list">
              <li><strong>Account</strong> means a unique account created for you to access our service or parts of our service.</li>
              <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our") refers to Counsellor, [College Address].</li>
              <li><strong>Cookies</strong> are small files placed on your device by a website.</li>
              <li><strong>Country</strong> refers to: [Country]</li>
              <li><strong>Device</strong> means any device that can access the service.</li>
              <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
            </ul>
            <h2 className="title">Collecting and Using Your Personal Data</h2>
            <h3 className="sub-title">Types of Data Collected</h3>
            <h4 className="sub-title">Personal Data</h4>
            <p>
            While using our service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you. Personally identifiable information may include, but
            is not limited to:
          </p>            <ul className="personal-data">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
            </ul>

            <h3 className="sub-title">Usage of Your Personal Data</h3>
            <p>The Company may use Personal Data for the following purposes:</p>
          <ul className="usage-data">
            <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
            <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
            <li><strong>For the performance of a contract:</strong> the development, compliance, and undertaking of the purchase contract for the products, items, or services You have purchased or of any other contract with Us through the Service.</li>
            <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products, or contracted services, including security updates, when necessary or reasonable for their implementation.</li>
            <li><strong>To provide You</strong> with news, special offers </li>
           </ul>

            <h3 className="sub-title">Contact Us</h3>
            <p>If you have any questions or comments about this policy, you may email us at <a href="mailto:counsellorweb@support.com">counsellorweb@support.com</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
