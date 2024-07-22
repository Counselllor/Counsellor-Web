import React, { useState } from "react";
import "./StudentDetailed.css";
import Backdrop from "./Backdrop";

const StudentDetailed = ({ student, onBackClick }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  if (!student) {
    return <div>No student selected</div>;
  }

  const imgArray = [
    "/src/assets/9.png",
    "/src/assets/11.png",
    "/src/assets/8.png",
    "/src/assets/10.png",
    "/src/assets/element 6.png",
    "/src/assets/element 7.png",
  ];

  // Sample achievements
  const achievements = [
    "First Place in Coding Competition",
    "Top Performer in Data Science",
    "Published Research Paper",
  ];

  const handleCardClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="student-detailed-container">
      <button className="back-button" onClick={onBackClick}>
        &larr; Back
      </button>
      <div className="student-info">
        <img src={imgArray[0]} alt={student.name} className="student-image" />
        <div className="about-student">
          <h2 className="student-name">{student.name}</h2>
          <p className="student-detail">
            <strong>Course:</strong> {student.course}
          </p>
          <p className="student-detail">
            <strong>Branch:</strong> {student.branch}
          </p>
          <p className="student-detail">
            <strong>Year:</strong> {student.year}
          </p>
          <p className="student-detail">
            <strong>Position:</strong> {student.position}
          </p>
        </div>
      </div>
      <hr style={{ marginBlock: "20px" }} />
      <div className="cards">
        <div className="card1" onClick={handleCardClick}>
          <div className="card-content">
            <i className="fas fa-trophy fa-2x"></i>
            <h1 className="card-title">Achievements</h1>
          </div>
        </div>
        <div className="card2">
          <div className="card-content">
            <i className="fas fa-book fa-2x"></i>
            <h1 className="card-title">Tech Stack Names</h1>
          </div>
        </div>
        <div className="card3">
          <div className="card-content">
            <i className="fab fa-instagram fa-2x"></i>
            <h1 className="card-title">Social Links</h1>
          </div>
        </div>
        <div className="card4">
          <div className="card-content">
            <i className="far fa-clock fa-2x"></i>
            <h1 className="card-title">Slot available</h1>
          </div>
        </div>
      </div>
      <Backdrop isVisible={isPopupVisible} onClose={handleClosePopup}>
        <h2 className="student-card-title">Student Achievements</h2>
        <ul className="student-card-content">
          {achievements.map((achievement, index) => (
            <li className="student-card-subtitlte" key={index}>{achievement}</li>
          ))}
        </ul>
      </Backdrop>
    </div>
  );
};

export default StudentDetailed;
