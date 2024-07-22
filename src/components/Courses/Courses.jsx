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

const Courses = () => {

  let navigate=useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // handle user logged in state
      } else {

          navigate('/');
        
      }
    });
  }, [navigate]); 






  return (
    <>
   <Navbar/>
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
