import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import Logo from "../../assets/logo.webp";
import "./About.css";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

//Navbar
const Navbar = () => {

    const navigate = useNavigate();
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
      }
    });
  }, []);

  //Signout
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  //Toggle Menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
        <nav className="navbar">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? "show" : ""}`}>
            <ul>
              <li>
                <a href="#">Top Universities</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
              <li>
                <a href="#">Carrier Support</a>
              </li>
              <li className="dot">
                <a href="#">•</a>
              </li>
              {user ? (
                <>
                  <li>
                    <a href="#" onClick={handleSignOut}>
                      Log Out
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <button className="profile_btn">Profile</button>
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a href="/">Login</a>
                </li>
              )}
            </ul>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          </div>
        </nav>
  )
}

export default Navbar