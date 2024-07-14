import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import "./Dashboard.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import SearchIcon from "../../assets/search_icon.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import Footer from "../Footer/Footer";
import collegesData from "./colleges.json";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CollegeCard from "./CollegeCard";
import FAQs from '../FAQs/FAQs';
import { ThemeContext } from '../../App';
import { Switch } from 'antd';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColleges, setFilteredColleges] = useState(collegesData);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const mainRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);

  // Slider state for CTC and ratings
  const [ctcRange, setCtcRange] = useState([0, 100]);
  const [ratingRange, setRatingRange] = useState([0, 10]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if(localStorage.getItem('count')!=='false'){
          toast.success("Logged in! 🚀", {
            className: "toast-message",
          });
          localStorage.setItem('count', false);
        }
      } else {
        toast.success("Logged out!", {
          className: "toast-message",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const results = collegesData.filter(
      (college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(college => {
      const ctcValue = parseFloat(college.ctc.match(/(\d+)/)[0]);
      const ratingValue = college.rating;
      return ctcValue >= ctcRange[0] && ctcValue <= ctcRange[1] &&
             ratingValue >= ratingRange[0] && ratingValue <= ratingRange[1];
    });
    setFilteredColleges(results);
    setCurrentPage(1);
  }, [searchTerm, ctcRange, ratingRange]);

  useEffect(() => {
    if (location.hash === "#faqs1") {
      const faqsElement = document.getElementById("faqs1");
      if (faqsElement) {
        faqsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  }, [navigate]);

  const handleCollegeClick = useCallback(
    (college) => {
      navigate(`/college/${college.id}`);
    },
    [navigate]
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleTouchStart = (index) => {
    setActiveIndex(index);
  };

  const handleTouchEnd = () => {
    setActiveIndex(null);
  };

  const [fix, setFix] = useState(false);

  const setFixed = useCallback(() => {
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, [setFixed]);

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleCtcRangeChange = (value) => {
    setCtcRange(value);
  };

  const handleRatingRangeChange = (value) => {
    setRatingRange(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedColleges = filteredColleges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleResetFilters = () => {
    setCtcRange([0, 100]);
    setRatingRange([0, 10]);
  };

  return (
    <main ref={mainRef}>
      <div className="scroll">
        <ScrollToTop
          smooth
          viewBox="0 0 24 24"
          svgPath="M16 13a1 1 0 0 1-.707-.293L12 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 16 13z M16 17a1 1 0 0 1-.707-.293L12 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 16 17z"
          color="white"
          style={{ backgroundColor: "#5CB6F9" }}
        />
      </div>
      <nav className={`navbar ${fix ? "fixed" : ""}`}>
        <div className="logo">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className={`menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li>
              <a href="/topuniversities">Top Universities</a>
            </li>
            <li>
              <a href="/jobs">Jobs</a>
            </li>
            <li>
              <a href="./courses">Courses</a>
            </li>
            <li>
              <a href="./careersupport">Career Support</a>
            </li>
            <li>
              <a href="/" onClick={handleSignOut}>
                Log Out
              </a>
            </li>
            <li>
              <a href="./profile">
                <button className="profile_btn">Profile</button>
              </a>
            </li>
            <li>
              <Switch
                style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
                onChange={handleThemeChange}
                checked={theme === "dark"}
                checkedChildren="Dark Mode"
                unCheckedChildren="Light Mode"
              />
            </li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`} />
          <div className={`bar ${menuOpen ? "open" : ""}`} />
          <div className={`bar ${menuOpen ? "open" : ""}`} />
        </div>
      </nav>
      <div className="maintxt">
        <ToastContainer />
        <h1>
          <span className="blue">Find your </span>Dream
          <br />
          College <span className="blue">here!</span>
        </h1>
        <p>For the Students, By the Students</p>
      </div>
      <div className="search">
        <div className="s_bar_c">
          <a href="">
            <img src={SearchIcon} alt="Search" />
          </a>
          <div className="vl" />
          <input
            type="text"
            placeholder="Type college name or university name"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ outline: "1px solid black", fontSize: "20px" }}
          />
        </div>
        <button>Search</button>
        <div className="filters-dropdown">
          <button className="filters-button">Filters</button>
          <div className="filters-content">
            <div className="filter-slider">
              <h3>Highest CTC</h3>
              <Slider
                range
                min={0}
                max={100}
                onChange={handleCtcRangeChange}
                value={ctcRange}
                trackStyle={{ backgroundColor: "#5CB6F9" }}
                handleStyle={{ borderColor: "#5CB6F9" }}
              />
              <div className="slider-values">
                <span>Min: {ctcRange[0]} LPA</span>
                <span>Max: {ctcRange[1]} LPA</span>
              </div>
            </div>
            <div className="filter-slider">
              <h3>Rating</h3>
              <Slider
                range
                min={0}
                max={10}
                onChange={handleRatingRangeChange}
                value={ratingRange}
                trackStyle={{ backgroundColor: "#5CB6F9" }}
                handleStyle={{ borderColor: "#5CB6F9" }}
              />
              <div className="slider-values">
                <span>Min: {ratingRange[0]}</span>
                <span>Max: {ratingRange[1]}</span>
              </div>
            </div>
            <p className="reset-button" onClick={handleResetFilters}>
              Reset
            </p>
          </div>
        </div>
      </div>
      {filteredColleges.length === 0 ? (
        <div className="no-res-Found-cont">
          <h1>No Result Found</h1>
          <h2>We can't find any item matching your search</h2>
        </div>
      ) : (
        <div className="grid-cont"> 
          <div className="colleges1">
            {paginatedColleges.map((college, index) => (
              <div
                className={`college ${activeIndex === index ? "active" : ""}`}
                key={college.id}
                onClick={() => handleCollegeClick(college)}
                onTouchStart={() => handleTouchStart(index)}
                onTouchEnd={handleTouchEnd}
                style={{ height: "230px", width: "300px" }}
              >
                <div className="college-content">
                  <div className="up">
                    <img
                      className="college-image"
                      src={college.imageURL}
                      alt="College Logo"
                    />
                    <div className="context">
                      <p className="college_name">{college.name}</p>
                      <button className="btn1">{college.location}</button>
                    </div>
                  </div>
                  <div className="down">
                    <div className="ctc">{college.ctc}</div>
                    <div className="time">{college.time}</div>
                  </div>
                </div>
                <button className="click-info-button click-btn2">
                  <span className="text">Click for more info</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <FAQs />
      <Footer />
    </main>
  );
};

export default Dashboard;
