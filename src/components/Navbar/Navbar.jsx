import { useEffect, useState, useCallback } from 'react';
import { signOut } from "firebase/auth";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";

import "./Navbar.css";
import { auth } from "../../firebase/auth";


// Signout function
const signOutUser = (navigate, setError) => {
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      setError(err.message);
    });
};

// Toggle menu function
const toggleNavMenu = (setMenuOpen, menuOpen) => {
  setMenuOpen(!menuOpen);
};

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        console.log("");
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Define callbacks using useCallback
  const handleSignOutCallback = useCallback(() => {
    signOutUser(navigate, setError);
  }, [navigate, setError]);

  // Toggle menu callback
  const toggleMenuCallback = useCallback(() => {
    toggleNavMenu(setMenuOpen, menuOpen);
  }, [setMenuOpen, menuOpen]);

  // Define handleKeyPress outside of JSX
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenuCallback();
    }
  }, [toggleMenuCallback]);

  
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
const [fix, setFix]= useState(false)
//function for appearance of background for nav menu
function setFixed(){
  if(window.scrollY>0){
    setFix(true)
  }else{
    setFix(false)
  }
}

window.addEventListener("scroll", setFixed)

  return (
  
    <nav className={`navbar ${fix ? 'fixed' : ''}`}>
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
                <a href="#">Career Support</a>
              </li>
              <li className="dot">
                <a href="#"/>
              </li>
              <li>
                <a href="#" onClick={handleSignOut}>
                  Log Out
                </a>
              </li>
              <li>
                <Link to="/profile">
                  <button className="profile_btn" style={{textDecoration: 'none'}}>Profile</button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
          </div>
        </nav>
  );
};

// Logo Component
const LogoSection = () => (
  <div className="logo">
    <img src={Logo} alt="Logo" />
  </div>
);

// Menu Section Component
const MenuSection = ({ user, handleSignOut, menuOpen }) => (
  <div className={`menu ${menuOpen ? "show" : ""}`}>
    <ul>
      <MenuItem href="#">Top Universities</MenuItem>
      <MenuItem href="#">Jobs</MenuItem>
      <MenuItem href="#">Courses</MenuItem>
      <MenuItem href="#">Career Support</MenuItem>
      <MenuItem href="#" dot>•</MenuItem>
      {user ? (
        <>
          <MenuItem>
            <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', fontSize: '22px', color: "#12229D", fontFamily: 'Times New Roman' }}>
              Log Out
            </button>
          </MenuItem>
          <MenuItem>
              <button className="profile_btn"><a href="/profile">Profile</a></button>
          </MenuItem>
        </>
      ) : (
        <MenuItem>
          <a href="/">Login</a>
        </MenuItem>
      )}
    </ul>
  </div>
);

// MenuItem Component
const MenuItem = ({ href, dot, children }) => (
  <li className={dot ? "dot" : ""}>
    <a href={href}>{children}</a>
  </li>
);

// Hamburger Section Component
const HamburgerSection = ({ toggleMenu, menuOpen, handleKeyPress }) => (
  <div
    className="hamburger"
    onClick={toggleMenu}
    onKeyDown={handleKeyPress}
    tabIndex={0}
    role="button"
  >
    {[1, 2, 3].map((index) => (
      <div key={index} className={`bar ${menuOpen ? "open" : ""}`} />
    ))}
  </div>
);

// Error Section Component
const ErrorSection = ({ error }) => <div className="error">{error}</div>;

export default Navbar;