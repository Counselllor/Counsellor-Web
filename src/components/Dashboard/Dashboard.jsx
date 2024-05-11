import './Dashboard.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.webp'
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import collegesData from './colleges.json';
import ScrollToTop from "react-scroll-to-top";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColleges, setFilteredColleges] = useState(collegesData);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        console.log("");
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const results = collegesData.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(results);
  }, [searchTerm]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
      <main>
      <ScrollToTop color='white' style={{backgroundColor:"#5CB6F9"}}/>
        <nav className="navbar">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? 'show' : ''}`}>
            <ul>
              <li><a href="#">Top Universities</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Carrier Support</a></li>
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
          <h1><span className="blue">Find your </span>Dream<br></br>College <span className='blue'>here!</span></h1>
          <p>For the Students, By the Students</p>
        </div>
        <div className="search">
          <div className="s_bar_c">
          <a href="">
  <img src="src/assets/icons8-search-50.png" />
</a>
            <div className="vl"></div>
            <input type="text" placeholder='Type college name or university name' 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}/>
          </div>
          <button>Search</button>
        </div>
        <div className="navigator">
          <span className='nearby'>Nearby</span>
          <span className='seeall'>See All</span>
        </div>
        <div className="colleges">
          {filteredColleges.map((college, index) => (
            <div className="college" key={index}>
              <div className="up">
                <img src={college.imageURL} alt="College Logo" />
                <div className="context">
                  <p>{college.name}</p>
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

  )
}

export default Dashboard