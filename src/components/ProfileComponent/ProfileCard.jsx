import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";
import avatar4 from "../../assets/avatar4.png";
import techstack from "./techstack.json";

const ProfileCard = () => {
  const [dates, setDates] = useState([]);
  const [name, setName] = useState(localStorage.getItem("name") || "Alex Foam");
  const [dob, setDob] = useState(localStorage.getItem("dob") || "2000-01-21");
  const [academicYear, setAcademicYear] = useState(localStorage.getItem("academicYear") || "3rd Year");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || avatar1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(JSON.parse(localStorage.getItem("skills")) || []);
  const [socialProfiles, setSocialProfiles] = useState([]);
  const [resumeFile, setResumeFile] = useState(localStorage.getItem("resumeFile") || null);

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    console.log("Fetched socialProfiles:", storedProfiles);
    setSocialProfiles(storedProfiles);

    const generateDates = () => {
      const result = [];
      const currentDate = new Date();

      for (let i = 0; i < 23; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);
        result.push({
          day: date.getDate(),
          weekDay: date.toLocaleString("default", { weekday: "short" }),
          isActive: i === 9, // set 10th date as active for demonstration
        });
      }
      setDates(result);
    };

    generateDates();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("dob", dob);
    localStorage.setItem("academicYear", academicYear);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("skills", JSON.stringify(selectedSkills));
    if (resumeFile) {
      localStorage.setItem("resumeFile", resumeFile);
    }
    setIsEditing(false);
  };

  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
  };

  const handleSkillChange = (skill) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((s) => s !== skill);
      } else if (prevSkills.length < 5) {
        return [...prevSkills, skill];
      } else {
        return prevSkills;
      }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeFile(reader.result);
        localStorage.setItem("resumeFile", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleViewResume = () => {
    window.open(resumeFile, '_blank');
  };

  const handleDeleteResume = () => {
    setResumeFile(null);
    localStorage.removeItem("resumeFile");
  };

  return (
    <div className="profile-card-container">
      <div className="greeting">
        <div className="greeting-text">
          <h1>Hello, {name}!</h1>
          <p>
            Your Profile is updated here. Dates, counselling and your Skills are
            all in one tap.
          </p>
        </div>
      </div>
      <div className="profile-card-content">
        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="calendar">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`calendar-date ${date.isActive ? "active" : ""}`}
              >
                <span>{date.day}</span> <span>{date.weekDay}</span>
              </div>
            ))}
          </div>
          <p className="next-event">
            Next counselling: 22.04.2021 - Stay Connected
          </p>
        </div>
        <div className="profile-details">
          <div className="about">
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              labore distinctio optio nobis aut. Voluptatum laborum dolor fugit
              necessitatibus corrupti aspernatur, perferendis obcaecati eaque
              dolorem. Sint iusto animi minima delectus.
            </p>
          </div>
          <div className="about-info">
            <h3>Email : </h3> <p>counsellor@gmail.com</p>
          </div>
          <div className="about-info">
            <h3>Phone : </h3> <p>+918795768574</p>
          </div>
          <div className="about-info">
            <h3>Gender : </h3> <p>Male</p>
          </div>
          <div className="about-info">
            <h3>BirthDate : </h3> <p>{dob}</p>
          </div>
          <div className="about-info">
            <h3>College : </h3> <p>IIT Bombay</p>
          </div>
          <div className="about-info">
            <h3>Academic Year : </h3> <p>{academicYear}</p>
          </div>
          <div className="about-info">
            <h3>Resume : </h3>
            {resumeFile ? (
              <div>
                <button onClick={handleViewResume}>View Resume</button>
                <button onClick={handleDeleteResume}>Delete Resume</button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  style={{ display: 'none' }}
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="upload-button">
                  Upload Resume
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-summary">
        <div className="profile-card">
          <i className="bx bxs-edit" onClick={handleEdit}></i>
          <img
            src={avatar}
            alt="Profile"
            className="profile-image"
          />
          <h3>{name}</h3>
          <p className="title">IIT Bombay</p>
          <p className="role">Student</p>
          <div className="social-profiles">
            {socialProfiles.map((profile) => (
              <a key={profile.id} href={profile.url} target="_blank" rel="noopener noreferrer">
                <i className={`bx bxl-${profile.name.toLowerCase()}`}></i>
              </a>
            ))}
          </div>
          <div className="skills-section">
            <h2>Skills</h2>
            <ul>
              {selectedSkills.map((skill, index) => (
                <li key={index}>#{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Profile</h2>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </label>
            <label>
              Academic Year:
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              />
            </label>
            
            <div className="image-upload">
              <h3>Upload Profile Picture:</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="avatar-selection">
              <h3>Select Avatar:</h3>
              <div className="avatar-options">
                <div
                  className={`avatar-option ${avatar === avatar1 ? "selected" : ""}`}
                  onClick={() => handleAvatarChange(avatar1)}
                >
                  <img src={avatar1} alt="Avatar 1" />
                </div>
                <div
                  className={`avatar-option ${avatar === avatar2 ? "selected" : ""}`}
                  onClick={() => handleAvatarChange(avatar2)}
                >
                  <img src={avatar2} alt="Avatar 2" />
                </div>
                <div
                  className={`avatar-option ${avatar === avatar3 ? "selected" : ""}`}
                  onClick={() => handleAvatarChange(avatar3)}
                >
                  <img src={avatar3} alt="Avatar 3" />
                </div>
                <div
                  className={`avatar-option ${avatar === avatar4 ? "selected" : ""}`}
                  onClick={() => handleAvatarChange(avatar4)}
                >
                  <img src={avatar4} alt="Avatar 4" />
                </div>
              </div>
            </div>
            <div className="skills-selection">
              <h3>Select Skills (up to 5):</h3>
              <div className="skills-options">
                {techstack.map((skill, index) => (
                  <div
                    key={index}
                    className={`skill-option ${selectedSkills.includes(skill) ? "selected" : ""}`}
                    onClick={() => handleSkillChange(skill)}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;