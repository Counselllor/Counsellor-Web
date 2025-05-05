import React, { useState, useContext, useCallback, useEffect } from "react";
import "./Courses.css";
import coursesData from "./courses.json";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { Switch } from "antd";
import { ThemeContext } from "../../App";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { toast } from 'react-toastify';
import Navbar from "../Navbar/Navbar";
import CoursesSkeleton from "./CoursesSkeleton";

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    auth.onAuthStateChanged((user) => {
      if (user) {
        // handle user logged in state
      } else {
        navigate('/');
      }
    });

    // Simulate loading delay to show skeleton
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds loading time

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [navigate]);

  return (
    <>
   <Navbar/>
      <div className="courses-container">
        <header className="courses-header">
          <h1 className="courses-main-title">Available Courses</h1>
          <p className="courses-subtitle">Enhance your skills with our expert-led courses</p>
        </header>
        {loading ? (
          <CoursesSkeleton count={coursesData.length} />
        ) : (
          <div className="courses-list">
            {coursesData.map((course) => (
              <div className="course-card" key={course.id}>
                <img
                  src={course.image}
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
                  <button className="course-enroll-btn">Enroll Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Courses;
