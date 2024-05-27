// Import necessary dependencies and components
import React, { useEffect, useState, useCallback, useContext } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import Footer from "../Footer/Footer";
import collegesData from './colleges.json';
import ScrollToTop from "react-scroll-to-top";
import { ThemeContext } from '../../App';
import { Switch } from 'antd';

// CollegeCard component
const CollegeCard = ({ college, onClick, onTouchStart, onTouchEnd, active }) => (
  <div className={`college ${active ? 'active' : ''}`} onClick={onClick} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="college-content">
      <div className="up">
        <img src={college.imageURL} alt="College Logo" />
        <div className="context">
          <p className="college_name">{college.name}</p>
          <span className="college-location">{college.location}</span>
        </div>
      </div>
      <div className="down">
        <div className="ctc">{college.ctc}</div>
        <div className="time">{college.time}</div>
      </div>
    </div>
    <button className="click-info-button">Click for more info</button>
  </div>
);

// Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [filteredColleges, setFilteredColleges] = useState(collegesData);
  const [activeIndex, setActiveIndex] = useState(null);

  // Effect hook to check authentication status
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  // Effect hook to filter colleges based on search term
  useEffect(() => {
    const results = collegesData.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(results);
  }, [searchTerm]);

  // Sign out function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to handle college click
  const handleCollegeClick = useCallback((college) => {
    navigate(`/college/${college.id}`);
  }, []);

  // Function to toggle menu
  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  // Function to handle search input change
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Function to handle touch start
  const handleTouchStart = (index) => {
    setActiveIndex(index);
  };

  // Function to handle touch end
  const handleTouchEnd = () => {
    setActiveIndex(null);
  };

  // Function to handle theme change
  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <main>
      {/* Scroll to top button */}
      <ScrollToTop color='white' style={{ backgroundColor: "#5CB6F9" }} />
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        {/* Menu */}
        <div className={`menu ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><a href="/topuniversities">Top Universities</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/careersupport">Career Support</a></li>
            <li className='dot'><a href="error">•</a></li>
            <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
            <li><button className='profile_btn'>Profile</button></li>
            {/* Switch for theme */}
            <li><Switch style={{ backgroundColor: theme === "dark" ? "#000000" : "" }} onChange={handleThemeChange} checked={theme === "dark"} checkedChildren="Dark Mode" unCheckedChildren="Light Mode" /></li>
          </ul>
        </div>
        {/* Hamburger menu */}
        <button className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </button>
      </nav>
      {/* Main content */}
      <div className="maintxt">
        <h1><span className="blue">Find your </span>Dream<br />College <span className='blue'>here!</span></h1>
        <p>For the Students, By the Students</p>
      </div>
      {/* Search bar */}
      <div className="search">
        <div className="s_bar_c">
          <a href="">
            <img src="src/assets/icons8-search-50.png" alt="Search" />
          </a>
          <div className="vl"></div>
          <input type="text" placeholder='Type college name or university name'
            value={searchTerm}
            onChange={handleSearchChange} />
        </div>
        <button>Search</button>
      </div>
      {/* Navigator */}
      <div className="navigator">
        <span className='nearby'>Nearby</span>
        <span className='seeall'>See All</span>
      </div>
      {/* College cards */}
      <div className="colleges">
        {filteredColleges.map((college, index) => (
          <CollegeCard
            key={college.id}
            college={college}
            onClick={() => handleCollegeClick(college)}
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={handleTouchEnd}
            active={activeIndex === index}
          />
        ))}
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Dashboard;
