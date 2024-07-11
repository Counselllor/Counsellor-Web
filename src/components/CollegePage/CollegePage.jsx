import React, { useState, useEffect } from "react";
import collegesData from "../Dashboard/colleges.json";
import studentsData from "./students.json";
import "./CollegePage.css";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.webp";
import { signOut } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import { auth } from "../../firebase/auth";
import { Icon } from "@iconify/react";
import ScrollToTop from "react-scroll-to-top";
import { FaStar } from "react-icons/fa6";

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

  const [menuOpen, setMenuOpen] = useState(false);

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
    "/src/assets/avatar1.png",
    "/src/assets/avatar2.png",
    "/src/assets/avatar3.png",
    "/src/assets/avatar4.png",
    "/src/assets/avatar1.png",
    "/src/assets/avatar2.png",
  ];

  return (
    <>
      <ScrollToTop color="white" style={{ backgroundColor: "#5CB6F9" }} />
      <Navbar />
      <div className="page">
        <div className="left">
          <div className="content">
            <h1 className="college-name abeezee-regular">{college.name}</h1>
            <div className="description-card">
              <p className="description clipped-text abeezee-regular">
                {college.description}
              </p>
            </div>
            <div className="group">
              <div className="location">
                <div className="icon">
                  <Icon
                    icon="ion:location-outline"
                    style={{ fontSize: "24px" }}
                  />
                </div>
                <div className="location-depth">
                  <p className="location-heading abeezee-regular">Location</p>
                  <p className="location-text clipped-text1 abeezee-regular">
                    {college["exact-location"]}
                  </p>
                </div>
              </div>
              <div className="rating">
                <div className="rating-star">
                  <FaStar />
                  <FaStar /> <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="rate">
                  <p className="rating-heading abeezee-regular">Rating</p>
                  <p className="rating-text abeezee-regular">
                    {college.rating}/10
                  </p>
                </div>
              </div>
              <button className="search-button">
                <a href={college.website} target="_blank" rel="noreferrer">
                  Search
                </a>
              </button>
            </div>
            <img className="image" src={college.imageURL} alt={college.name} />
          </div>
        </div>
        <div className="right">
          <div className="searchCourses">
            <select
              id="courseList"
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
          </div>
          {filteredStudents.map((student, index) => (
            <div key={student.id} className="student-card">
              <div className="student-image">
                <img
                  src={`${imgArray[index % imgArray.length]}`}
                  alt={student.name}
                />
              </div>
              <div className="st">
                <p className="abeezee-regular student-name">{student.name}</p>
                <div className="student-description">
                  <p className="abeezee-regular">{student.course}</p>
                  <p className="abeezee-regular">{student.branch}</p>
                  <p className="abeezee-regular">{student.year}</p>
                </div>
                <p className="position abeezee-regular">{student.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollegePage;
