import React from "react";
import "./StudentDetailed.css";

const StudentDetailed = ({ student, onBackClick }) => {
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
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default StudentDetailed;
