import React from "react";
import { useParams } from "react-router-dom";
import StudentData from "../CollegePage/students.json";
import "./StudentDefault.css";

const StudentDefault = () => {
  const { id, name } = useParams();
  const student = StudentData.find(
    (student) => student.id === parseInt(id) && student.name === name
  );

  if (!student) {
    return <div className="student-not-found">Student not found</div>;
  }

  return (
    <div className="student-default-container">
      
      <h2 className="student-default-title">About {student.name}</h2>
      <div className="student-details">
        <h3>Course: {student.course}</h3>
        {student.branch && <h3>Branch: {student.branch}</h3>}
        <h3>Year: {student.year}</h3>
        <h3>Position: {student.position}</h3>
        <h3>College: {student.college}</h3>

        <h4>Achievements:</h4>
        <ul>
          {student.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
        <h4>Social Links:</h4>
        <ul>
          <li><a href={student.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={student.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          {student.socialLinks.twitter && (
            <li><a href={student.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>
          )}
        </ul>
        <h4>Available Slots:</h4>
        <ul>
          {student.availableSlots.map((slot, index) => (
            <li key={index}>{slot}</li>
          ))}
        </ul>
        <h4>Personal Projects:</h4>
        <ul>
          {student.personalProjects.map((project, index) => (
            <li key={index}>
              <strong>{project.title}:</strong> {project.description} -{" "}
              <a href={project.link} target="_blank" rel="noopener noreferrer">Link</a>
            </li>
          ))}
        </ul>
        <h4>Certifications:</h4>
        <ul>
          {student.certifications.map((certification, index) => (
            <li key={index}>{certification}</li>
          ))}
        </ul>
        <h4>Contact:</h4>
        <p>Email: {student.contact.email}</p>
        <p>Phone: {student.contact.phone}</p>
      </div>
    </div>
  );
};

export default StudentDefault;
