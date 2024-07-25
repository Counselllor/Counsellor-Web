import React from 'react';
import { useParams } from 'react-router-dom';
import StudenData from '../CollegePage/students.json';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import './SocialLinks.css';

const SocialLinks = () => {
  const { id } = useParams();
  const student = StudenData.find(student => student.id === parseInt(id));

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="social-links-container">
      <h2>{student.name}</h2>
      <p>{student.position} at {student.college}</p>
      <hr />
      <div className="social-links">
        <a href={student.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        <a href={student.socialLinks.github} target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
        <a href={student.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
