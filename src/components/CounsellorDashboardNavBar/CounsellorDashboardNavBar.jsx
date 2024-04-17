import { useState } from "react";
import Logo from "../../assets/logo.webp";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "./CounsellorDashboardNavBar.css";
import { auth } from "../../firebase/auth";

const CounsellorDashboardNavBar = () => {
  const navigate = useNavigate();

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li>
              <a href="dashboard">Your Listed College</a>
            </li>
            <li>
              <a href="new">List New/Update College</a>
            </li>
            <li className="dot">
              <a href="#">•</a>
            </li>
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
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>
      </nav>
    </>
  );
};

export default CounsellorDashboardNavBar;
