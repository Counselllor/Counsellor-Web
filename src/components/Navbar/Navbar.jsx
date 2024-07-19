import { useEffect, useState, useCallback, useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import "./Navbar.css";
import { auth } from "../../firebase/auth";
import { ThemeContext } from "../../App";
import { Switch } from "antd";
import { toast } from "react-toastify";

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
  const [fix, setFix] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("login");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  }, [navigate]);

  const toggleMenuCallback = useCallback(() => {
    toggleNavMenu(setMenuOpen, menuOpen);
  }, [setMenuOpen, menuOpen]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        toggleMenuCallback();
      }
    },
    [toggleMenuCallback]
  );

  const setFixed = () => {
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);

  return (
    <nav className={`navbar ${fix ? "fixed" : ""}`}>
      <LogoSection />
      <MenuSection user={user} handleSignOut={handleSignOut} menuOpen={menuOpen} toggleTheme={toggleTheme} theme={theme} />
      <HamburgerSection toggleMenu={toggleMenuCallback} menuOpen={menuOpen} handleKeyPress={handleKeyPress} />
    </nav>
  );
};

const LogoSection = () => (
  <div className="logo">
    <Link to="/dashboard">
      <img src={Logo} alt="Logo" />
    </Link>
  </div>
);

const MenuSection = ({ user, handleSignOut, menuOpen, toggleTheme, theme }) => (
  <div className={`menu ${menuOpen ? "show" : ""}`}>
    <ul>
      <MenuItem href="/topuniversities">Top Universities</MenuItem>
      <MenuItem href="/jobs">Jobs</MenuItem>
      <MenuItem href="/courses">Courses</MenuItem>
      <MenuItem href="/careersupport">Career Support</MenuItem>
      {user ? (
        <>
          <MenuItem>
          <a href="/" onClick={handleSignOut}>
                Log Out
              </a>
          </MenuItem>
          <MenuItem>
              <a href="./profile">
                <button className="profile_btn">Profile</button>
              </a>
            </MenuItem>
        </>
      ) : (
        <MenuItem>
          <a href="/">Login</a>
        </MenuItem>
      )}
      <li>
        <Switch
          style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
          onChange={toggleTheme}
          checked={theme === "dark"}
          checkedChildren="Dark Mode"
          unCheckedChildren="Light Mode"
        />
      </li>
    </ul>
  </div>
);

const MenuItem = ({ href, children }) => (
  <li>
    <a href={href}>{children}</a>
  </li>
);

const HamburgerSection = ({ toggleMenu, menuOpen, handleKeyPress }) => (
  <div className="hamburger" onClick={toggleMenu} onKeyDown={handleKeyPress} tabIndex={0} role="button">
    {[1, 2, 3].map((index) => (
      <div key={index} className={`bar ${menuOpen ? "open" : ""}`} />
    ))}
  </div>
);

export default Navbar;
