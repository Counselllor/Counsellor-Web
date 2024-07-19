import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './CareerSupport.css';
import Navbar from '../Navbar/Navbar';
import Logo from "../../assets/logo.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { Switch } from 'antd';
import { ThemeContext } from '../../App';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';

const CareerSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { theme, toggleTheme } = useContext(ThemeContext);
const [showPopup,setShowPopup]=useState(false)
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }, []);
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // handle user logged in state
      } else {

          navigate('/');
        
      }
    });
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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


  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, [setFixed]);

  const pricingSectionRef = useRef(null);

  const scrollToPricing = () => {
    if (pricingSectionRef.current) {
      pricingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      <div className="career-support">
        <nav className={`navbar ${fix ? "fixed" : ""}`}>
          <div className="logo">
            <img src={Logo} alt="Logo" />
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
              <li className="dot">
                <a href="error">•</a>
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
        <header className="career-support__header">
          <h1 className="career-support__main-title">Elevate Your Career</h1>
          <p className="career-support__subtitle">
            Empowering professionals to reach new heights
          </p>
        </header>

        <section className="career-support__content">
          <h2 className="career-support__title">Our Career Support Services</h2>
          <div className="career-support__services">
            <div className="service-card">
              <div className="service-card__icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3 className="service-card__title">Job Placement</h3>
              <p className="service-card__description">
                We connect you with top employers in your field, leveraging our
                extensive network of industry partners.
              </p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="service-card__title">Skill Development</h3>
              <p className="service-card__description">
                Enhance your skills with our targeted training programs,
                designed to keep you competitive in today's job market.
              </p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="service-card__title">Career Counseling</h3>
              <p className="service-card__description">
                Get personalized advice from experienced professionals to guide
                your career decisions and growth strategy.
              </p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3 className="service-card__title">Resume Building</h3>
              <p className="service-card__description">
                Craft a compelling resume that highlights your strengths and
                catches the eye of potential employers.
              </p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="service-card__title">Interview Preparation</h3>
              <p className="service-card__description">
                Boost your confidence with mock interviews and expert tips to
                ace your next job interview.
              </p>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="service-card__title">Career Advancement</h3>
              <p className="service-card__description">
                Develop strategies for climbing the corporate ladder and
                achieving your long-term career goals.
              </p>
            </div>
          </div>
        </section>

        <section className="career-support__pricing" ref={pricingSectionRef}>
          <h2 className="career-support__pricing-title">
            Career Advice Pricing
          </h2>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3 className="pricing-card__title">First Session</h3>
              <p className="pricing-card__price">FREE</p>
              <ul className="pricing-card__features">
                <li>30-minute consultation</li>
                <li>Career path assessment</li>
                <li>Basic advice and guidance</li>
              </ul>
              <button className="pricing-card__button">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3 className="pricing-card__title">Basic Package</h3>
              <p className="pricing-card__price">$99</p>
              <ul className="pricing-card__features">
                <li>3 one-hour sessions</li>
                <li>Personalized career plan</li>
                <li>Resume review</li>
                <li>Interview preparation</li>
              </ul>
              <button className="pricing-card__button">Choose Plan</button>
            </div>
            <div className="pricing-card">
              <h3 className="pricing-card__title">Premium Package</h3>
              <p className="pricing-card__price">$249</p>
              <ul className="pricing-card__features">
                <li>5 one-hour sessions</li>
                <li>Comprehensive career strategy</li>
                <li>LinkedIn profile optimization</li>
                <li>Job search strategy</li>
                <li>Ongoing email support</li>
              </ul>
              <button className="pricing-card__button">Choose Plan</button>
            </div>
          </div>
        </section>

        <section className="career-support__form-section">
          <h2 className="career-support__form-title">
            Get Personalized Career Advice
          </h2>
          <form className="career-support__form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: "100%", borderColor: "#76c6f5" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="career-support__form-submit">
              Send Message
            </button>
          </form>
        </section>

        <section className="career-support__cta">
          <h2 className="career-support__cta-title">
            Ready to Take the Next Step?
          </h2>
          <p className="career-support__cta-text">
            Join thousands of professionals who have accelerated their careers
            with our support.
          </p>
          <button className="career-support__cta-button" onClick={scrollToPricing} >
            Get Started Today
          </button>
        </section>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Thank You!</h2>
              <p>
                Your message has been sent successfully. We will reach out to
                you soon.
              </p>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
        <Footer />
    </>
  );
};

export default CareerSupport;
