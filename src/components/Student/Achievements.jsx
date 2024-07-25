import React from "react";
import StudentData from "../CollegePage/students.json";
import { useParams } from "react-router-dom";

const Achievements = () => {
  const { id } = useParams();
  const student = StudentData.find((student) => student.id === parseInt(id));
  return (
    <div className="student-achievements">
      <h2>Achievements</h2>
      <ul>
        {student.achievements.map((achievement, index) => (
          <div className="acheive-card">
            <i className="fas fa-trophy"></i>
            <li key={index}>{achievement}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
