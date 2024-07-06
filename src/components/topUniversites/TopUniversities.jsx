import React, { useState, useEffect } from 'react';
import './topuniversities.css';
import colleges from "../json/college.json";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const TopUniversities = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [displayedColleges, setDisplayedColleges] = useState([]);

  useEffect(() => {
    const shuffledColleges = colleges.sort(() => 0.5 - Math.random());
    setDisplayedColleges(shuffledColleges.slice(0, 12));
  }, []);

  const handleCollegeClick = (college) => {
    // Handle college click event
    console.log(college);
  };

  const handleTouchStart = (index) => {
    setActiveIndex(index);
  };

  const handleTouchEnd = () => {
    setActiveIndex(null);
  };

  return (
    <div>
        <Navbar />
      <h1 className="heading" style={{marginTop: "50px", fontSize: "50px"}}>Top Universities</h1>
      <div className="colleges">
        {displayedColleges.map((college, index) => (
          <div
            className={`college ${activeIndex === index ? 'active' : ''}`}
            key={college.id}
            onClick={() => handleCollegeClick(college)}
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={handleTouchEnd}
            style={{ height: "230px", width: "300px" }}
          >
            <div className="college-content">
              <div className="up">
                <img className="college-image" src={college.imageURL} alt="College Logo" />
                <div className="context">
                  <p className="college_name">{college.name}</p>
                  <button className="btn1">{college.location}</button>
                </div>
              </div>
              <div className="down">
                <div className="ctc">{college.ctc}</div>
                <div className="time">{college.time}</div>
              </div>
            </div>
            <button className="click-info-button click-btn2">
              <span className="text">Click for more info</span>
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TopUniversities;
