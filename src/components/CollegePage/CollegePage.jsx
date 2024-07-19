import React, { useState, useEffect } from 'react';
import collegesData from '../Dashboard/colleges.json';
import studentsData from './students.json';
import './CollegePage.css';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import { signOut } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import { auth } from "../../firebase/auth";
import { Icon } from '@iconify/react';
import ScrollToTop from "react-scroll-to-top";
import {FaStar,FaStarHalf} from 'react-icons/fa6'
import Footer from '../Footer/Footer';
import { toast } from 'react-toastify';

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
  useEffect(() => {
    
  });

  if (!college) {
    return <div>College not found</div>;
  }

  const [selectedCourse, setSelectedCourse] = useState('BTech');

  const filteredStudents = studentsData.filter(student => student.course === selectedCourse && student.college === college.name);


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

  const imgArray=['/src/assets/9.png','/src/assets/11.png','/src/assets/8.png','/src/assets/10.png','/src/assets/element 6.png','/src/assets/element 7.png']
  return (
    <>
      <ScrollToTop color="white" style={{ backgroundColor: "#5CB6F9" }} />
      <Navbar />
      {/* <div style={{height:"60px"}}></div> */}
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
                    <p className="location-headingcoll abeezee-regular">Location</p>
                    <p className="location-text clipped-text1 abeezee-regular">
                      {college["exact-location"]}
                    </p>
                  </div>
                </div>
                <div className="ratingcoll">
                  <div className='ratingcollstar'>
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
            <div key={student.id} className="student-card">
              <div
                style={{
                  width: "20%",
                  display: "flex",
                  paddingLeft: "20px",
                  alignitems: "center",
                }}
              >
                <img
                  src={imgArray[index]}
                  style={{ height: "80%", minHeight: "66px", maxWidth: "80%" }}
                />
              </div>
              <div className="st">
                <p
                  className="abeezee-regular"
                  style={{
                    textAlign: "left",
                    width: "50%",
                    fontSize: "15px",
                    marginBottom: "0px",
                    marginTop: "10px",
                    paddingLeft: "8px",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: "15px",
                  }}
                >
                  {student.name}
                </p>
                <div className="student-description">
                  <p
                    className="abeezee-regular"
                    style={{
                      marginBottom: "0px",
                      marginTop: "18px",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {student.course}
                  </p>
                  <p
                    className="abeezee-regular"
                    style={{
                      marginBottom: "0px",
                      marginTop: "18px",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {student.branch}
                  </p>
                  <p
                    className="abeezee-regular"
                    style={{
                      marginBottom: "0px",
                      marginTop: "18px",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  >
                    {student.year}
                  </p>
                </div>
                <div className="lowercoll">
                  <p className="position abeezee-regular">{student.position}</p>
                  <p className="collago">3 min ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollegePage;