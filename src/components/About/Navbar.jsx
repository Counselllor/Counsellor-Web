import { useEffect, useState, useCallback } from 'react';
import { signOut } from "firebase/auth";
import Logo from "../../assets/logo.webp";
import "./About.css";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

// Signout function
const handleSignOut = (navigate, setError) => {
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      setError(err.message);
    });
};

// Toggle menu function
const toggleMenu = (setMenuOpen, menuOpen) => {
  setMenuOpen(!menuOpen);
};

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
      }
    });
  }, []);

  // Define callbacks using useCallback
  const handleSignOutCallback = useCallback(() => {
    handleSignOut(navigate, setError);
  }, [navigate, setError]);

  const toggleMenuCallback = useCallback(() => {
    toggleMenu(setMenuOpen, menuOpen);
  }, [setMenuOpen, menuOpen]);

  return (
    <nav className="navbar">
      <LogoSection />
      <MenuSection
        user={user}
        handleSignOut={handleSignOutCallback}
        toggleMenu={toggleMenuCallback}
        menuOpen={menuOpen}
      />
      <HamburgerSection toggleMenu={toggleMenuCallback} menuOpen={menuOpen} />
      {error && <ErrorSection error={error} />}
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
      <MenuItem href="#">Carrier Support</MenuItem>
      <MenuItem href="#" dot>•</MenuItem>
      {user ? (
        <>
          <MenuItem>
            <a href="#" onClick={handleSignOut}>
              Log Out
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#">
              <button className="profile_btn">Profile</button>
            </a>
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
const HamburgerSection = ({ toggleMenu, menuOpen }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleMenu();
    }
  };

  return (
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
};

// Error Section Component
const ErrorSection = ({ error }) => <div className="error">{error}</div>;

export default Navbar;
