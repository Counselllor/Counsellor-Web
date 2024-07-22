import React, { useContext, useEffect, useState , useCallback } from 'react';
import './Contribute.css'; // Import CSS file for styles
import Footer from '../Footer/Footer';
// import Navbar from '../Navbar/Navbar';
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../../assets/logo.webp";
import { ThemeContext } from '../../App';
import { Switch } from 'antd';
import ScrollToTop from 'react-scroll-to-top';

import BackToHomeButton from '../backtohome';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Contribute = () => {
  const owner = 'Counselllor';
  const repo = 'Counsellor-Web';
  const contributorsPerPage = 10; // Display 10 contributors per page
  const [contributors, setContributors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate=useNavigate();

  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        duration: 1200,
      });
    }, 100);

    // Refresh AOS on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        duration: 1200,
        disable: window.innerWidth < 1724

      });
    }, 100);

    // Refresh AOS on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        if (!response.ok) {
          console.error('Failed to fetch contributors:', response.statusText);
          return;
        }
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    fetchContributors();
  }, [owner, repo]);

  const handleProfileClick = (username) => {
    const profileUrl = `https://github.com/${username}`;
    window.open(profileUrl, '_blank'); // Open the GitHub profile in a new tab
  };
  const displayTopContributors = () => {
      return contributors.slice(0, 3).map(contributor => (
      <div data-aos="fade-up" key={contributor.login} className="contributor-card" onClick={() => handleProfileClick(contributor.login)}>
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div className="contributor-info">
          <h3>{contributor.login}</h3>
          <p>{contributor.contributions} contributions</p>
        </div>
      </div>
    ));
  };
  const displayContributors = () => {
    return contributors.slice(0, contributors.length).map(contributor => (
      <div key={contributor.login}  className="contributor-card" onClick={() => handleProfileClick(contributor.login)}>
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div className="contributor-info">
          <h3>{contributor.login}</h3>
          <p>{contributor.contributions} contributions</p>
        </div>
      </div>
    ));
  };

  const createPaginationButtons = () => {
    const totalPages = Math.ceil(contributors.length / contributorsPerPage);
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ));
  };
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  
  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  });
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
  return (
    <>
      <ScrollToTop
        smooth
        viewBox="0 0 24 24"
        svgPath="M16 13a1 1 0 0 1-.707-.293L12 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 16 13z M16 17a1 1 0 0 1-.707-.293L12 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 16 17z"
        
        color="white"
        style={{ backgroundColor: "#5CB6F9" }}
      />
  {/* <nav className={`navbar fixed`}>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? "show" : ""}`}>
            <ul>
            <li><a href="/topuniversities">Top Universities</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="./courses">Courses</a></li>
             <li><a href="/careersupport">Career Support</a></li>
            <li className='dot'><a href="error">•</a></li>
             <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
            <li><button className='profile_btn'>Profile</button></li>
             <li><Switch style={{ backgroundColor: theme === "dark" ? "#000000" : "" }} onChange={handleThemeChange} checked={theme === "dark"} checkedChildren="Dark Mode" unCheckedChildren="Light Mode" /></li>
            </ul>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
          </div>
        </nav> */}
    <div className="contribute-container">



      <BackToHomeButton />

      <header className="contributor-header">
        <h1 className="contributor-heading">Our Amazing Contributors</h1>
        <p className="contributor-subheading">Meet the incredible people who make our project possible. Click on their profiles to learn more about their contributions.</p>
      </header>
      <div className="thank-you-message">
        <h2>Thank You to All Our Contributors</h2>
        <p>Your hard work and dedication are truly appreciated!</p>
      </div>
      <div className="top-contributor-cards">
        <h1>Our Top Contributors</h1><br></br>
        <div className='top-contri'>
          {displayTopContributors()}
        </div>
        <h1>All  Contributors</h1><br></br>
        <div className='all'>

          {displayContributors()}
        </div>
      </div>
     
    </div>
    <Footer />



    </>
  );
};

export default Contribute;
