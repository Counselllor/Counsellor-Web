import { useEffect, useState, useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import './Navbar.css';
import { auth } from '../../firebase/auth';

// Signout function
const signOutUser = (navigate, setError) => {
  signOut(auth)
    .then(() => {
      navigate('/');
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

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // handle user logged in state
  //     } else {

  //         navigate('/');
        
  //     }
  //   });
  // }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
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
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        toggleMenuCallback();
      }
    },
    [toggleMenuCallback]
  );

  // Function to toggle background appearance for nav menu
  const setFixed = () => {
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener('scroll', setFixed);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${fix ? 'fixed' : ''}`}>
      <LogoSection />
      <MenuSection user={user} handleSignOut={handleSignOut} menuOpen={menuOpen} />
      <HamburgerSection toggleMenu={toggleMenu} menuOpen={menuOpen} handleKeyPress={handleKeyPress} />
    </nav>
  );
};

// Logo Section Component
const LogoSection = () => (
  <div className="logo">
    <Link to="/dashboard">
      <img src={Logo} alt="Logo" />
    </Link>
  </div>
);

// Menu Section Component
const MenuSection = ({ user, handleSignOut, menuOpen }) => (
  <div className={`menu ${menuOpen ? 'show' : ''}`}>
    <ul>

      <MenuItem href="/top-university">Top Universities</MenuItem>
      <MenuItem href="/jobs">Jobs</MenuItem>
      <MenuItem href="/cources">Courses</MenuItem>
      <MenuItem href="/careersupport">Career Support</MenuItem>
      {user ? (
        <>
          <MenuItem>
            <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', fontSize: '22px', color: '#12229D', fontFamily: 'Times New Roman' }}>
              Log Out
            </button>
          </MenuItem>
          <MenuItem>
            <button className="profile_btn"><Link to="/profile">Profile</Link></button>
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
  <li className={dot ? 'dot' : ''}>
    <a href={href}>{children}</a>
  </li>
);

// Hamburger Section Component
const HamburgerSection = ({ toggleMenu, menuOpen, handleKeyPress }) => (
  <div className="hamburger" onClick={toggleMenu} onKeyDown={handleKeyPress} tabIndex={0} role="button">
    {[1, 2, 3].map((index) => (
      <div key={index} className={`bar ${menuOpen ? 'open' : ''}`} />
    ))}
  </div>
);

export default Navbar;
