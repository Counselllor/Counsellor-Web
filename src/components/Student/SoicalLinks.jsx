import React from "react";
import { Link, useParams } from "react-router-dom";
import StudenData from "../CollegePage/students.json";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import "./SocialLinks.css";

const SocialLinks = () => {
  const { id } = useParams();
  const student = StudenData.find((student) => student.id === parseInt(id));

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="social-links-container">
      <h2>{student.name}</h2>
      <p>
        {student.position} at {student.college}
      </p>
      <hr />
      <div className="social-links">
        <Link
          to={student.socialLinks.linkedin}
          style={{ textDecoration: "none" }}
        >
          <div className="linked-in">
            <a
              href={student.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={30} />
            </a>
            <h1>LinkedIn</h1>
          </div>
        </Link>
        <Link
          to={student.socialLinks.github}
          style={{ textDecoration: "none" }}
        >
          <div className="github">
            <a
              href={student.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} />
            </a>
            <h1>Github</h1>
          </div>
        </Link>
        <Link
          to={student.socialLinks.twitter}
          style={{ textDecoration: "none" }}
        >
          <div className="twitter">
            <a
              href={student.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={30} />
            </a>
            <h1>Twitter</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
