import { useEffect, useState, useCallback, useContext } from 'react';
import { signOut } from "firebase/auth";
import Logo from "../../assets/logo.webp";
import "./About.css";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { Switch } from 'antd';
import { ThemeContext } from '../../App';

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
  const { theme, toggleTheme } = useContext(ThemeContext); 

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
      }
    });
  }, []);

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

  // Theme toggle function
  const handleThemeChange = () => {
    toggleTheme(); 
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <nav className="navbar">
      <LogoSection />
      <MenuSection
        user={user}
        handleSignOut={handleSignOutCallback}
        toggleMenu={toggleMenuCallback}
        menuOpen={menuOpen}
        theme={theme}
        handleThemeChange={handleThemeChange}
      />
      <HamburgerSection 
        toggleMenu={toggleMenuCallback} 
        menuOpen={menuOpen} 
        handleKeyPress={handleKeyPress} 
      />
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
const MenuSection = ({ user, handleSignOut, menuOpen, theme, handleThemeChange }) => {
  return (
    <div className={`menu ${menuOpen ? "show" : ""}`}>
      <ul>

        <MenuItem href="/top-university">Top Universities</MenuItem>
        <MenuItem href="/jobs">Jobs</MenuItem>
        <MenuItem href="/cources">Courses</MenuItem>
        <MenuItem href="/careersupport">Career Support</MenuItem>
        {user ? (
          <>
            <MenuItem>
              <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', fontSize: '22px', color: "#12229D", fontFamily: 'Times New Roman' }}>
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
            <a href="/">Login</a>
          </MenuItem>
        )}
        <MenuItem>
          <Switch 
            style={{ backgroundColor: theme === "dark" ? "#000000" : ""}} 
            onChange={handleThemeChange} 
            checked={theme === "dark"} 
            checkedChildren="Dark Mode" 
            unCheckedChildren="Light Mode" 
          />
        </MenuItem>
      </ul>
    </div>
  );
};


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
