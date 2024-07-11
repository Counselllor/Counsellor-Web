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
    "/src/assets/9.png",
    "/src/assets/11.png",
    "/src/assets/10.png",
    "/src/assets/8.png",
    "/src/assets/9.png",
    "/src/assets/11.png",
  ];
  const collegeImageURL = college.imageURL;

  const contentStyle = {
    backgroundImage: collegeImageURL ? `url(${collegeImageURL})` : "none",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "10px",
    // paddingTop: "70px",
    paddingBottom: "70px",
    textAlign: "start",
    opacity: "0.8",
    position: "relative",
    zIndex:5,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "20px",
    zIndex: 1, // Ensure the overlay is on top
  };


  return (
    <>
      <ScrollToTop color="white" style={{ backgroundColor: "#5CB6F9" }} />
      <Navbar className="overlayhelp"/>
      <div className="page">
        <div className="left" style={contentStyle}>
          <div className="content" style={overlayStyle}>
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
            {/* <img className="image" src={college.imageURL} alt={college.name} /> */}
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
                <div className="student-seentime">
                <p className="position abeezee-regular">{student.position}</p>
                <p className="sst2">3 min ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollegePage;
