// Import necessary dependencies and components
import { useEffect, useState, useCallback, useContext } from 'react';
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
  <div
    className={`college ${active ? 'active' : ''}`}
    onClick={onClick}
    onTouchStart={onTouchStart}
    onTouchEnd={onTouchEnd}
    role="button"
    tabIndex={0}
  >
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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const results = collegesData.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(results);
  }, [searchTerm]);

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  const handleCollegeClick = useCallback((college) => {
    navigate(`/college/${college.id}`);
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleTouchStart = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <main>
      <ScrollToTop color='white' style={{ backgroundColor: "#5CB6F9" }} />
      <nav className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><a href="/topuniversities">Top Universities</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/careersupport">Career Support</a></li>
            <li className='dot'><a href="error">•</a></li>
            <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
            <li><button className='profile_btn'>Profile</button></li>
            <li><Switch style={{ backgroundColor: theme === "dark" ? "#000000" : "" }} onChange={handleThemeChange} checked={theme === "dark"} checkedChildren="Dark Mode" unCheckedChildren="Light Mode" /></li>
          </ul>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}/>
          <div className={`bar ${menuOpen ? 'open' : ''}`}/>
          <div className={`bar ${menuOpen ? 'open' : ''}`}/>
        </button>
      </nav>
      <div className="maintxt">
        <h1><span className="blue">Find your </span>Dream<br />College <span className='blue'>here!</span></h1>
        <p>For the Students, By the Students</p>
      </div>
      <div className="search">
        <div className="s_bar_c">
          <img src="src/assets/icons8-search-50.png" alt="Search" />
          <div className="vl"/>
          <input type="text" placeholder='Type college name or university name'
            value={searchTerm}
            onChange={handleSearchChange} />
        </div>
        <button>Search</button>
      </div>
      <div className="navigator">
        <span className='nearby'>Nearby</span>
        <span className='seeall'>See All</span>
      </div>
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
      <Footer />
    </main>
  );
};

export default Dashboard;
