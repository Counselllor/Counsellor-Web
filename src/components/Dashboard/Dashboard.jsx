import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import "./Dashboard.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import SearchIcon from "../../assets/search_icon.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import Footer from "../Footer/Footer";
import collegesData from "./colleges.json";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollegeCard from "./CollegeCard";
import FAQs from '../FAQs/FAQs';
import Testimonial from "../Testimonial/Testimonial";
import { ThemeContext } from '../../App';
import { Switch } from 'antd';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
  const [ctcRange, setCtcRange] = useState([0, 200]);
  const [ratingRange, setRatingRange] = useState([0, 10]);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (localStorage.getItem("count") !== "false") {
          toast.success("Logged in! 🚀", {
            className: "toast-message",
          });
          localStorage.setItem("count", false);
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
    const results = collegesData
      .filter(
        (college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((college) => {
        const ctcValue = parseCtcValue(college.ctc);
        const ratingValue = college.rating;
        return (
          ctcValue >= ctcRange[0] &&
          ctcValue <= ctcRange[1] &&
          ratingValue >= ratingRange[0] &&
          ratingValue <= ratingRange[1]
        );
      });
    setFilteredColleges(results);
    setCurrentPage(1);
  }, [searchTerm, ctcRange, ratingRange]);
  const parseCtcValue = (ctc) => {
    const match = ctc.match(/(\d+(\.\d+)?)\s*(crore|Cr|lakh|L|LPA)/i);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[3].toLowerCase();

    if (unit.includes("crore") || unit.includes("cr")) {
      return value * 100; // Convert crore to lakhs
    }
    return value; // Already in lakhs
  };

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
        localStorage.removeItem("login");
        navigate("/");
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
    setCtcRange([0, 200]);
    setRatingRange([0, 10]);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
        <div className="search_box">
          <button>Search</button>
        </div>
      </div>
      <div className="filters-dropdown">
        <p className="filter_icon" onClick={handleModalOpen}>
          {/* filter Icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                className="icon_color_share"
                d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
        </p>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-close" onClick={handleModalClose}>
                X
              </p>
              <div className="filter-section">
                <h2>Filters</h2>
                <div className="slider">
                  <label>CTC Range</label>
                  <Slider
                    range
                    min={0}
                    max={200}
                    value={ctcRange}
                    onChange={handleCtcRangeChange}
                    trackStyle={[{ backgroundColor: "#5CB6F9" }]}
                    handleStyle={[
                      { backgroundColor: "#5CB6F9" },
                      { backgroundColor: "#5CB6F9" },
                    ]}
                  />
                  <p>
                    {ctcRange[0]}L - {ctcRange[1]}L
                  </p>
                </div>
                <div className="slider">
                  <label>Rating Range</label>
                  <Slider
                    range
                    min={0}
                    max={10}
                    value={ratingRange}
                    onChange={handleRatingRangeChange}
                    trackStyle={[{ backgroundColor: "#5CB6F9" }]}
                    handleStyle={[
                      { backgroundColor: "#5CB6F9" },
                      { backgroundColor: "#5CB6F9" },
                    ]}
                  />
                  <p>
                    {ratingRange[0]} - {ratingRange[1]}
                  </p>
                </div>
                <p className="reset-button " onClick={handleResetFilters}>
                  Reset Filters
                </p>
              </div>
            </div>
          </div>
        )}
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
      <Testimonial/>
      <Footer />
    </main>
  );
};

export default Dashboard;
