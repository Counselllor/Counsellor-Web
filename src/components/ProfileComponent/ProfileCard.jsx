import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";
import avatar4 from "../../assets/avatar4.png";

const ProfileCard = () => {
  const [dates, setDates] = useState([]);
  const [name, setName] = useState(localStorage.getItem("name") || "Alex Foam");
  const [dob, setDob] = useState(localStorage.getItem("dob") || "2000-01-21");
  const [academicYear, setAcademicYear] = useState(localStorage.getItem("academicYear") || "3rd Year");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || avatar1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
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
    setIsEditing(false);
  };

  const handleAvatarChange = (newAvatar) => {
    setAvatar(newAvatar);
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
          <div className="skills-section">
            <h2>Skills</h2>
            <ul>
              <li>#JavaScript</li>
              <li>#MongoDB</li>
              <li>#Node.js</li>
              <li>#HTML5</li>
              <li>#CSS3</li>
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

            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
