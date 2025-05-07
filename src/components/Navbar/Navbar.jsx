import { useEffect, useState, useCallback, useContext } from "react";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import "./Navbar.css";
import { auth, database } from "../../firebase/auth";
import { ref, get } from "firebase/database";
import { ThemeContext } from "../../App";
import { Switch } from "antd";
import { toast } from "react-toastify";

// Signout function
const signOutUser = (navigate, setError) => {
  signOut(auth)
    .then(() => {
      // Clear all authentication-related localStorage items
      localStorage.removeItem("userUid");
      localStorage.removeItem("login");
      localStorage.removeItem("isAdmin");
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
  const [login, setLogin] = useState(localStorage.getItem("login") || "");
  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedLogin = localStorage.getItem("login");
      setLogin(storedLogin);
    }, 1000); // Check every second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    {
      login &&
        auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
            navigate("/");
          }
        });
    }
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
       <LogoSection login={login} />
      <MenuSection
        user={user}
        handleSignOut={handleSignOut}
        menuOpen={menuOpen}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <HamburgerSection
        toggleMenu={toggleMenuCallback}
        menuOpen={menuOpen}
        handleKeyPress={handleKeyPress}
      />
    </nav>
  );
};

const LogoSection = ({ login }) => (

  <div className="logo">

    <Link to={login ? "/dashboard" : "/"}>
      <img src={Logo} alt="Logo" />
    </Link>
  </div>
);

const MenuSection = ({ user, handleSignOut, menuOpen, toggleTheme, theme }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Verify admin status from database, not just localStorage
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const uid = localStorage.getItem("userUid");
          if (uid) {
            const userRef = ref(database, `users/${uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
              const userData = snapshot.val();
              if (userData.isAdmin === true) {
                setIsAdmin(true);
                localStorage.setItem("isAdmin", "true");
              } else {
                setIsAdmin(false);
                localStorage.removeItem("isAdmin");
              }
            }
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          localStorage.removeItem("isAdmin");
        }
      } else {
        setIsAdmin(false);
        localStorage.removeItem("isAdmin");
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <div className={`menu ${menuOpen ? "show" : ""}`}>
      <ul>
        <MenuItem href="/topuniversities">Top Universities</MenuItem>
        <MenuItem href="/jobs">Jobs</MenuItem>
        <MenuItem href="/courses">Courses</MenuItem>
        <MenuItem href="/careersupport">Career Support</MenuItem>
        {user ? (
          <>
            <MenuItem>
              <button
                onClick={handleSignOut}
                className="logout-btn"
              >
                Log Out
              </button>
            </MenuItem>
            <MenuItem>
              <a href="/profile" className="profile-link" style={{ textDecoration: 'none', border: 'none' }}>
                <button className="profile_btn" style={{ position: 'relative', zIndex: 5 }}>
                  Profile
                </button>
              </a>
            </MenuItem>
            {isAdmin && (
              <MenuItem>
                <a href="/admin/dashboard" className="admin-link">
                  <button className="admin_btn">
                    Admin Panel
                  </button>
                </a>
              </MenuItem>
            )}
          </>
        ) : (
          <>
            {/* <MenuItem>
              <a href="/">Login</a>
            </MenuItem>
            <MenuItem>
              <a href="/admin/login" className="admin-link">Admin Login</a>
            </MenuItem> */}
          </>
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
};

const MenuItem = ({ href, children }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (href) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <li>
      {href ? (
        <a href={href} onClick={handleClick}>{children}</a>
      ) : (
        children
      )}
    </li>
  );
};

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

export default Navbar;
