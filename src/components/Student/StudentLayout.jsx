// StudentLayout.jsx
import React from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import StudentData from "../CollegePage/students.json";
import "./Student.css"; // Import external CSS

const StudentLayout = () => {
  const { id } = useParams();
  const student = StudentData.find((student) => student.id === parseInt(id));

  if (!student) {
    return <div>No student found</div>;
  }

  const imgArray = [
    "/src/assets/9.png",
    "/src/assets/11.png",
    "/src/assets/8.png",
    "/src/assets/10.png",
    "/src/assets/element 6.png",
    "/src/assets/element 7.png",
  ];

  return (
    <>
      <Navbar />
      <div className="single-student-container">
        <div className="single-student-details">
          <div className="single-student-profile">
            <div className="dp-container">
              <img src={imgArray[0]} className="student-dp" alt="" />
            </div>
            <div className="single-student-info-header">
              <h1>{student.name}</h1>
              <p className="single-student-college">{student.college}</p>
              <div className="other-details">
                <p>
                  <strong>Course:</strong> {student.course}
                </p>
                <p>
                  <strong>Branch:</strong> {student.branch}
                </p>
                <p>
                  <strong>Year:</strong> {student.year}
                </p>
                <p>
                  <strong>Position:</strong> {student.position}
                </p>
              </div>
            </div>
          </div>
          <div className="student-details-content">
            <div className="nav">
              <Link to="achievements" className="student-link">
                Achievements
              </Link>
              <Link to="tech-stack" className="student-link">
                Tech Stack
              </Link>
              <Link to="social-links" className="student-link">
                Social Links
              </Link>
              <Link to="available-slots" className="student-link">
                Available Slots
              </Link>
            </div>
            <div className="children-container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentLayout;
