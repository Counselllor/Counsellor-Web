import React, { useState, useEffect } from "react";
import collegesData from "../Dashboard/colleges.json";
import studentsData from "./students.json";
import "./CollegePage.css";
import { useParams, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import { auth } from "../../firebase/auth";
import { Icon } from "@iconify/react";
import ScrollToTop from "react-scroll-to-top";
import { FaStar } from "react-icons/fa";
import Footer from "../Footer/Footer";

const CollegePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();
<<<<<<< HEAD

=======
>>>>>>> 86a89d244305ab049f65b61c145602951f6985d3

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // handle user logged in state
      } else {
          navigate('/');
      }
    });
  }, [navigate]);
  const college = collegesData.find(college => college.id === parseInt(id));

  if (!college) {
    return <div>College not found</div>;
  }

  const [selectedCourse, setSelectedCourse] = useState("BTech");
  const filteredStudents = studentsData.filter(
    (student) =>
      student.course === selectedCourse && student.college === college.name
  );

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <ScrollToTop color="white" style={{ backgroundColor: "#5CB6F9" }} />
      <Navbar />
      <div className="college-page-container">
        <div className="college-info">
          <h1 className="college-name">{college.name}</h1>
          <p className="college-description">{college.description}</p>
          <div className="college-details">
            <div className="college-location">
              <Icon icon="ion:location-outline" className="icon" />
              <div>
                <p className="detail-heading">Location</p>
                <p className="detail-text">{college["exact-location"]}</p>
              </div>
            </div>
            <div className="college-rating">
              <div className="stars">
                <FaStar size={"20px"} />
              </div>
              <div>
                <p className="detail-heading">Rating</p>
                <p className="detail-text">{college.rating}/10</p>
              </div>
            </div>
            <a
              href={college.website}
              target="_blank"
              rel="noreferrer"
              className="college-website-button"
            >
              Visit Website
            </a>
          </div>
          <img
            src={college.imageURL}
            alt={college.name}
            className="college-image"
          />
        </div>
        <div className="students-section">
          <h1 className="college-name">Student Section</h1>
          <select
            className="course-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="BTech">BTech</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
            <option value="BCA">BCA</option>
            <option value="BSc">BSc</option>
            <option value="MSc">MSc</option>
            <option value="PHD">PHD</option>
          </select>
          {filteredStudents.map((student, index) => (
            <div key={student.id} className="student-card">
              <img
                src={`https://cdn-icons-png.flaticon.com/512/2784/2784461.png`}
                alt={student.name}
                className="student-photo"
              />
              <div className="student-info">
                <p className="student-name">{student.name}</p>
                <p className="student-course">{student.course}</p>
                <p className="student-branch">{student.branch}</p>
                <p className="student-year">{student.year}</p>
                <p className="student-position">{student.position}</p>
              </div>
            </div>
          ))}

          <div className="cards">
            <div className="card1">
              <div className="card-content">
                <i className="fas fa-trophy fa-2x"></i>
                <h1>Achievements</h1>
              </div>
            </div>
            <div className="card2">
              <div className="card-content">
                <i className="fas fa-book fa-2x"></i>
                <h1>Books</h1>
              </div>
            </div>
            <div className="card3">
              <div className="card-content">
                <i className="fas fa-football-ball fa-2x"></i>
                <h1>Sports</h1>
              </div>
            </div>
            <div className="card4">
              <div className="card-content">
                <i className="far fa-clock fa-2x"></i>
                <h1>TimeTable</h1>
              </div>
            </div>
          </div>

          <div className="upcoming">
            <h1>upcoming events</h1>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CollegePage;
