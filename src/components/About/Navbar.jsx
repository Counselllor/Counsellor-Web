import { useEffect, useState, useCallback } from 'react';
import { signOut } from "firebase/auth";
import Logo from "../../assets/logo.webp";
import "./About.css";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

// Signout function
const performSignOut = (navigate, setError) => {
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      setError(err.message);
    });
};

// Toggle menu function
const handleMenuToggle = (setMenuOpen, menuOpen) => {
  setMenuOpen(!menuOpen);
};

// Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
    });
  }, []);

  // Define callbacks using useCallback
  const handleSignOutCallback = useCallback(() => {
    performSignOut(navigate, setError);
  }, [navigate, setError]);

  const toggleMenuCallback = useCallback(() => {
    handleMenuToggle(setMenuOpen, menuOpen);
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
const MenuSection = ({ user, handleSignOut, toggleMenu, menuOpen }) => (
  <div className={`menu ${menuOpen ? "show" : ""}`}>
    <ul>
      <MenuItem href="/universities">Top Universities</MenuItem>
      <MenuItem href="/jobs">Jobs</MenuItem>
      <MenuItem href="/courses">Courses</MenuItem>
      <MenuItem href="/support">Career Support</MenuItem>
      <MenuItem dot>•</MenuItem>
      {user ? (
        <>
          <MenuItem>
            <button 
              onClick={handleSignOut} 
              style={{background: 'transparent', border: 'none', fontSize: '22px', color: "#12229D", fontFamily: 'Times New Roman'}}
            >
              Log Out
            </button>
          </MenuItem>
          <MenuItem>
            <a href="/profile">
              <button className="profile_btn">Profile</button>
            </a>
          </MenuItem>
        </>
      ) : (
        <MenuItem>
          <a href="/login">Login</a>
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
