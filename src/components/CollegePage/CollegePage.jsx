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

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // handle user logged in state
      } else {
        navigate("/");
      }
    });
  }, [navigate]);
  const college = collegesData.find((college) => college.id === parseInt(id));
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
      <ScrollToTop color="white" style={{ backgroundColor: "#5CB6F9" }} />
      <Navbar />
      {/* <div style={{height:"60px"}}></div> */}
      <div className="college-page-container">
        <div className="leftcoll">
          <div className="content">
            <div style={{ height: "auto", width: "100%", paddingTop: "20px" }}>
              <h1 className="college-name abeezee-regular">{college.name}</h1>
              <div className="description-card">
                <p className="description clipped-text abeezee-regular">
                  {college.description}
                </p>
              </div>
              <div className="group">
                <div className="locationcoll">
                  <div className="icon">
                    <Icon
                      icon="ion:location-outline"
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div className="location-depthcoll">
                    <p className="location-headingcoll abeezee-regular">
                      Location
                    </p>
                    <p className="location-text clipped-text1 abeezee-regular">
                      {college["exact-location"]}
                    </p>
                  </div>
                </div>
                <div className="ratingcoll">
                  <div className="ratingcollstar">
                    <FaStar />
                    <FaStar /> <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <div className="ratecoll">
                    <p className="rating-heading abeezee-regular">Rating</p>
                    <p className="rating-text abeezee-regular">
                      {college.rating}/10
                    </p>
                  </div>
                </div>
                <button className="search-button ">
                  <a href={college.website} target="_blank" rel="noreferrer">
                    Search
                  </a>
                </button>
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
