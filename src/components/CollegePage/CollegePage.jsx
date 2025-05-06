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
import { FaRupeeSign } from "react-icons/fa";
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

  // Extract package information
  const extractPackageInfo = () => {
    // Default values
    let highestPackage = { value: 0, display: "Not available" };
    let lowestPackage = { value: 0, display: "Not available" };

    // Extract highest package from ctc field
    if (college.ctc) {
      const highestMatch = college.ctc.match(/Highest CTC - ([\d.]+)\s*(LPA|Crore|lakh)/i);
      if (highestMatch) {
        const value = parseFloat(highestMatch[1]);
        const unit = highestMatch[2].toLowerCase();

        // Convert to LPA for consistent comparison
        let valueInLPA = value;
        if (unit.includes('crore')) {
          valueInLPA = value * 100; // 1 crore = 100 lakhs
        }

        highestPackage = {
          value: valueInLPA,
          display: `${value} ${unit}`
        };
      }
    }

    // For lowest package, we'll estimate as 30% of highest package if not explicitly provided
    // This is just an estimation for demonstration purposes
    if (highestPackage.value > 0) {
      const lowestValue = Math.round(highestPackage.value * 0.3);
      lowestPackage = {
        value: lowestValue,
        display: `${lowestValue} LPA (estimated)`
      };
    }

    return { highestPackage, lowestPackage };
  };

  const { highestPackage, lowestPackage } = extractPackageInfo();

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
    // "/src/assets/element 6.png",
    // "/src/assets/element 7.png",
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
            <div className="college-content-wrapper">
              <div className="college-info">
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
                        style={{ fontSize: "24px", color: "white" }}
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
                      <FaStar style={{ color: "#FFD700" }} />
                      <FaStar style={{ color: "#FFD700" }} />
                      <FaStar style={{ color: "#FFD700" }} />
                      <FaStar style={{ color: "#FFD700" }} />
                      <FaStar style={{ color: "#FFD700" }} />
                    </div>
                    <div className="ratecoll">
                      <p className="rating-heading abeezee-regular">Rating</p>
                      <p className="rating-text abeezee-regular">
                        {college.rating}/10
                      </p>
                    </div>
                  </div>
                  <button className="search-button">
                    <a href={college.website} target="_blank" rel="noreferrer">
                      Visit Website
                    </a>
                  </button>
                </div>

                {/* Package Information Section */}
                <div className="package-info-section">
                  <h3 className="package-info-title abeezee-regular">Package Information</h3>
                  <div className="package-info-cards">
                    <div className="package-card highest-package">
                      <div className="package-icon">
                        <FaRupeeSign style={{ fontSize: "24px", color: "#FFD700" }} />
                      </div>
                      <div className="package-details">
                        <p className="package-label abeezee-regular">Highest Package</p>
                        <p className="package-value abeezee-regular">{highestPackage.display}</p>
                      </div>
                    </div>
                    <div className="package-card lowest-package">
                      <div className="package-icon">
                        <FaRupeeSign style={{ fontSize: "24px", color: "white" }} />
                      </div>
                      <div className="package-details">
                        <p className="package-label abeezee-regular">Lowest Package</p>
                        <p className="package-value abeezee-regular">{lowestPackage.display}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="college-image-container">
                <img className="image" src={college.imageURL} alt={college.name} />
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <h2 className="students-heading abeezee-regular">Students from {college.name}</h2>
          <div className="searchCourses">
            <label htmlFor="courseList" className="course-label abeezee-regular">Select Course:</label>
            <select
              id="courseList"
              value={selectedCourse}
              className="course-select abeezee-regular"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="BTech">BTech</option>
              <option value="BBA">BBA</option>
              <option value="MBA">MBA</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSc">BSc</option>
              <option value="MSc">MSc</option>
              <option value="PHD">PHD</option>
            </select>
          </div>

          <div className="students-container">
            {filteredStudents.length === 0 ? (
              <div className="no-students-message">
                <p className="abeezee-regular">No students found for {selectedCourse} course.</p>
              </div>
            ) : (
              filteredStudents.map((student, index) => (
                <Link
                  to={`/student/${student.id}/${student.name}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={student.id}
                >
                  <div
                    className="student-card"
                    onClick={() => handleStudentClick(student)}
                  >
                    <div className="student-image-container">
                      <img
                        src={imgArray[index % imgArray.length]}
                        alt={student.name}
                        className="student-image"
                      />
                    </div>
                    <div className="student-info">
                      <h3 className="student-name abeezee-regular">{student.name}</h3>
                      <p className="student-position abeezee-regular">{student.position}</p>
                      <p className="student-course abeezee-regular">{student.course} • {student.year} Year</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollegePage;
