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
      <h1 className="social-title">Social Links</h1>
      <hr />
      <div className="social-links">
        <Link
          to={student.socialLinks.linkedin}
          style={{ textDecoration: "none" }}
        >
          <div className="icon-card">
            <a
              href={student.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="social-icon" size={30} />
            </a>
            <p>LinkedIn</p>
          </div>
        </Link>
        <Link
          to={student.socialLinks.github}
          style={{ textDecoration: "none" }}
        >
          <div className="icon-card">
            <a
              href={student.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={30} />
            </a>
            <p>Github</p>
          </div>
        </Link>
        <Link
          to={student.socialLinks.twitter}
          style={{ textDecoration: "none" }}
        >
          <div className="icon-card">
            <a
              href={student.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={30} />
            </a>
            <p>Twitter</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
