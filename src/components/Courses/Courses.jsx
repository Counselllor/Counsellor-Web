import React, { useState, useContext, useCallback } from "react";
import "./Courses.css";
import coursesData from "./courses.json";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { Switch } from "antd";
import { ThemeContext } from "../../App";

const Courses = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

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
  });

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  });

  return (
    <>
      <nav className={`navbar fixed`}>
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
              <a href="/careersupport">Career Support</a>
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
              <button className="profile_btn">Profile</button>
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
      <div className="courses-container">
        <h1 className="courses-title">Available Courses</h1>
        <div className="courses-list">
          {coursesData.map((course) => (
            <div className="course-card" key={course.id}>
              <img
                src={course.imageURL}
                alt={course.title}
                className="course-image"
              />
              <div className="course-info">
                <h2 className="course-title">{course.title}</h2>
                <p className="course-description">{course.description}</p>
                <p className="course-instructor">
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <p className="course-duration">
                  <strong>Duration:</strong> {course.duration}
                </p>
                <p className="course-price">
                  <strong>Price:</strong> {course.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
