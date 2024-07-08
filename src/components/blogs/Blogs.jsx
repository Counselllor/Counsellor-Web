import React, { useCallback, useContext, useState } from "react";
import './Blogs.css'; // Import CSS file for styles
import BackToHomeButton from "../backtohome";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { ThemeContext } from '../../App';
import { Switch } from 'antd';
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { toast } from 'react-toastify';

const blogsData = [
  {
    title: "Understanding the Role of a Counselor",
    date: "June 20, 2024",
    summary: "Counselors play a vital role in supporting individuals through personal challenges and mental health issues. Learn more about their responsibilities and impact.",
    tags: ["Counseling", "Mental Health"],
    author: "John Doe",
    link: "#"
  },
  // other blog data...
];

const Blogs = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

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

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <>        
      <nav className={`navbar fixed`}>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
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
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>
      </nav>
      <div className="blogs-container">
        <BackToHomeButton />
        <header className="blogs-header">
          <h1>Our Latest Blogs</h1>
          <p>Stay updated with our latest news and articles on counseling.</p>
        </header>
        <div className="blogs-list">
          {blogsData.map((blog, index) => (
            <div key={index} className="blog-card">
              <h2>{blog.title}</h2>
              <p className="blog-date">{blog.date}</p>
              <p>{blog.summary}</p>
              <p className="blog-author">By: {blog.author}</p>
              <div className="blog-tags">
                {blog.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="blog-tag">{tag}</span>
                ))}
              </div>
              <button className="click-btn1">
                <a href={blog.link}>Read More</a>
              </button>
              <div className="read-more-container">
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
