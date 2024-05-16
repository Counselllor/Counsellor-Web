import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import Footer from "../Footer/Footer";
import collegesData from './colleges.json';
import ScrollToTop from "react-scroll-to-top";

const Dashboard = () => {
  const navigate = useNavigate();
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

  const handleCollegeClick = (college) => {
    navigate(`/college/${college.id}`);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <main>
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
        <div className="maintxt">
          <h1><span className="blue">Find your </span>Dream<br />College <span className='blue'>here!</span></h1>
          <p>For the Students, By the Students</p>
        </div>
        <div className="search">
          <div className="s_bar_c">
            <a href="">
              <img src="src/assets/icons8-search-50.png" alt="Search" />
            </a>
            <div className="vl"></div>
            <input type="text" placeholder='Type college name or university name' />
          </div>
          <button>Search</button>
        </div>
        <div className="navigator">
          <span className='nearby'>Nearby</span>
          <span className='seeall'>See All</span>
        </div>
        <div className="colleges">
          {collegesData.map((college, index) => (
            <div className="college" key={index} onClick={() => handleCollegeClick(college)}>
              <div className="up">
                <img src={college.imageURL} alt="College Logo" />
                <div className="context">
                  <p className="college_name">{college.name}</p>
                  <span>{college.location}</span>
                </div>
              </div>
              <div className="down">
                <div className="ctc">{college.ctc}</div>
                <div className="time">{college.time}</div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;
