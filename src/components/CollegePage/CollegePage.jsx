import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import collegesData from '../Dashboard/colleges.json';
import studentsData from './students.json';
import './CollegePage.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { Icon } from '@iconify/react';

const CollegePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  console.log("ID from URL:", id); 

  
  const college = collegesData.find(college => college.id === parseInt(id));

  console.log("College object:", college); 
  console.log(college.imageURL)

  
  if (!college) {
    return <div>College not found</div>;
  }

  const [selectedCourse, setSelectedCourse] = useState('BTech'); 

  const filteredStudents = studentsData.filter(student => student.course === selectedCourse);

  const backgroundImageClass = `college-background-${college.id}`;
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
          <div className="content">
            <h1 className="college-name">{college.name}</h1>
            <div className="description-card">
              <p className="description">{college.description}</p>
            </div>
            <div className="location">
              <div className="location-depth">
                <Icon icon="ion:location-outline" style={{ fontSize: '24px', marginLeft: '40px', paddingRight: '0px' }} /> <p className="location-heading">Location</p></div>
              <p className="location-text">{college['exact-location']}</p>
            </div>
          </div>
          <img className="image" src={college.imageURL} />
          <button className="search-button">Search</button>
        </div>
        <div className="right">
        <div className="searchCourses">
  <input type="text" list="courseList" placeholder="Search courses" onChange={(e) => setSelectedCourse(e.target.value)} />
  <datalist id="courseList">
    <option value="BTech">BTech</option>
    <option value="BBA">BBA</option>
    <option value="BCA">BCA</option>
  </datalist>
</div>

          <div className="students">
            {filteredStudents.map((student, index) => (
              <div key={index} className="student-card">
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
