import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import collegesData from "../Dashboard/colleges.json";
import studentsData from "./students.json";
import "./CollegePage.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import { auth } from "../../firebase/auth";
import { Icon } from "@iconify/react";
import ScrollToTop from "react-scroll-to-top";
import { FaStar } from "react-icons/fa";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";

const CollegePage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleBackClick = () => {
    setSelectedStudent(null);
  };

  return (
    <>
      <ScrollToTop color="white" style={{ backgroundColor: "#5CB6F9" }} />
      <Navbar />
      <div className="pagecoll">
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
                    <FaStar />
                    <FaStar />
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
            <img className="image" src={college.imageURL} />
          </div>
        </div>
        <div className="right">
          <div className="searchCourses" style={{ marginTop: "20px" }}>
            <select
              id="courseList"
              value={selectedCourse}
              placeholder="Search courses"
              style={{
                backgroundColor: "#c5d5d4",
                outline: "none",
                border: "none",
                fontWeight: "600",
                fontSize: "20px",
              }}
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
            <Link
              to={`/student/${student.id}/${student.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={student.id}  // Ensure unique key
            >
              <div
                className="student-card"
                onClick={() => handleStudentClick(student)}
              >
                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    paddingLeft: "20px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={imgArray[index % imgArray.length]}  // Use modulo for safety
                    style={{
                      height: "80%",
                      minHeight: "66px",
                      maxWidth: "80%",
                    }}
                    alt=""
                  />
                </div>
                <div className="st">
                  <p
                    className="abeezee-regular"
                    style={{
                      textAlign: "left",
                      width: "50%",
                      fontSize: "20px",
                      marginBottom: "0px",
                      marginTop: "10px",
                      paddingLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {student.name}
                  </p>
                  <p
                    className="abeezee-regular"
                    style={{
                      textAlign: "left",
                      width: "100%",
                      fontSize: "14px",
                      paddingLeft: "10px",
                    }}
                  >
                    {student.position}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollegePage;
