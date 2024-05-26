import React, { useState, useEffect } from 'react';
import collegesData from '../Dashboard/colleges.json';
import studentsData from './students.json';
import './CollegePage.css';
import { useParams,useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { Icon } from '@iconify/react';
import ScrollToTop from "react-scroll-to-top";


const CollegePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { id } = useParams();


  const college = collegesData.find(college => college.id === parseInt(id));

  
  if (!college) {
    return <div>College not found</div>;
  }

  const [selectedCourse, setSelectedCourse] = useState('');

  const filteredStudents = studentsData.filter(student => student.course === selectedCourse && student.college === college.name);


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

  return (
    <>
      <ScrollToTop color='white' style={{ backgroundColor: "#5CB6F9" }} />
      <nav className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><a href="#">Top Universities</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Career Support</a></li>
            <li className='dot'><a href="#">•</a></li>
            <li><a href="#" onClick={handleSignOut}>Log Out</a></li>
            <li><a href="#"><button className='profile_btn'>Profile</button></a></li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </nav>
      <div className="page">
      <div className="left">
        <div className={`content ${selectedCourse ? 'show' : 'hide'}`}>
            <h1 className="college-name">{college.name}</h1>
            <div className="description-card">
              <p className="description">{college.description}</p>
            </div>
            <div className="group">
              <div className="location">
                <div className="location-depth">
                  <Icon icon="ion:location-outline" style={{ fontSize: '24px', marginLeft: '40px', paddingRight: '0px' }} />
                  <p className="location-heading">Location</p>
                </div>
                <p className="location-text">{college['exact-location']}</p>
              </div>
              <div className="rating">
                <p className="rating-heading">Rating</p>
                <p className="rating-text">{college.rating}/10</p>
            </div>
          </div>
    </div>
          <img className={`image ${selectedCourse ? 'hide' : 'show'}`} src={college.imageURL} alt="College" />
        <button className={`search-button ${selectedCourse ? 'hide' : 'show'}`}>
          <a href={college.website} target="_blank" rel="noreferrer">Search</a>
        </button>
      </div>
      <div className="right">
        <div className="searchCourses">
          <select
            id="courseList"
            value={selectedCourse}
            placeholder="Search courses"
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            <option value="BTech">BTech</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
            <option value="BCA">BCA</option>
            <option value="BSc">BSc</option>
            <option value="MSc">MSc</option>
            <option value="PHD">PHD</option>
          </select>
        </div>
        <div className="students">
          {filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <h2 className="student">{student.name}</h2>
              <div className="student-description">
                <p className="course">{student.course}</p>
                <p className="branch">{student.branch}</p>
                <p className="year">{student.year}</p>
              </div>
              <p className="position">{student.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CollegePage;
