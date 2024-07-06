import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";
import avatar4 from "../../assets/avatar4.png";
import techstack from "./techstack.json";

const ProfileCard = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "Alex Foam");
  const [dob, setDob] = useState(localStorage.getItem("dob") || "2000-01-21");
  const [academicYear, setAcademicYear] = useState(localStorage.getItem("academicYear") || "3rd Year");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || avatar1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(JSON.parse(localStorage.getItem("skills")) || []);
  const [profiles, setProfiles] = useState(JSON.parse(localStorage.getItem("profiles")) || [
    {
      id: 1,
      name: "Twitter",
      url: "https://twitter.com/arafatnayeem94",
    },
    {
      id: 2,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arafatnayeem/",
    },
    {
      id: 3,
      name: "Behance",
      url: "https://www.behance.net/arafatnayeem",
    },
  ]);
  const [newProfile, setNewProfile] = useState({ name: "", url: "" });
  const [editingId, setEditingId] = useState(null);
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [dates, setDates] = useState([]);

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
          isActive: i === 9,
        });
      }

      setDates(result);
    };

    generateDates();
  }, []);

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("dob", dob);
    localStorage.setItem("academicYear", academicYear);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("skills", JSON.stringify(selectedSkills));
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({ ...newProfile, [name]: value });
  };

  const handleAddProfile = () => {
    if (!newProfile.name || !isValidUrl(newProfile.url)) {
      alert("Please enter a valid profile name and URL starting with http");
      return;
    }
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1 }]);
    setNewProfile({ name: "", url: "" });
    setShowNewProfileForm(false);
  };

  const handleProfileChange = (id, url) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, url } : profile
      )
    );
  };

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleEditProfile = (id) => {
    setEditingId(id);
  };

  const handleSaveProfile = () => {
    setEditingId(null);
  };

  const isValidUrl = (url) => {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const socialIcons = {
    twitter: "bx bxl-twitter",
    linkedin: "bx bxl-linkedin",
    behance: "bx bxl-behance",
    facebook: "bx bxl-facebook",
    instagram: "bx bxl-instagram",
    github: "bx bxl-github",
  };

  return (
    <div className="profile-card-container">
      <div className="greeting">
        <div className="greeting-text">
          <h1>Hello, {name}!</h1>
          <p>
            Your Profile is updated here. Dates, counselling, and your skills are
            all in one tap.
          </p>
        </div>
      </div>
      <div className="profile-card-content">
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
            <div className="social-icons">
              {profiles.map((profile) => (
                <a
                  key={profile.id}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={socialIcons[profile.name.toLowerCase()] || "bx bx-link"}></i>
                </a>
              ))}
            </div>
            <p className="role">Student</p>
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
      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Profile</h2>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Date of Birth:
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </label>
            <label>
              Academic Year:
              <input type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
            </label>
            <label>
              Avatar:
              <select value={avatar} onChange={(e) => handleAvatarChange(e.target.value)}>
                <option value={avatar1}>Avatar 1</option>
                <option value={avatar2}>Avatar 2</option>
                <option value={avatar3}>Avatar 3</option>
                <option value={avatar4}>Avatar 4</option>
              </select>
            </label>
            <label>
              Skills:
              <div className="skills-checkboxes">
                {techstack.map((skill) => (
                  <div key={skill}>
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    {skill}
                  </div>
                ))}
              </div>
            </label>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
      {editingId !== null && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Social Profile</h2>
            <label>
              Profile Name:
              <input
                type="text"
                value={profiles.find((profile) => profile.id === editingId)?.name || ""}
                readOnly
              />
            </label>
            <label>
              Profile URL:
              <input
                type="text"
                value={profiles.find((profile) => profile.id === editingId)?.url || ""}
                onChange={(e) => handleProfileChange(editingId, e.target.value)}
              />
            </label>
            <button onClick={handleSaveProfile}>Save</button>
          </div>
        </div>
      )}
      <div className="social-profile-container">
        <div className="social-profile-header">
          <div className="heading">
            <h2>Social Profile</h2>
            <p>You can update your social profile here</p>
          </div>
        </div>
        <div className="profile-list">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-item">
              <div className="icon-details">
                <i className={socialIcons[profile.name.toLowerCase()] || "bx bx-link"}></i>
                <h4>{profile.name.slice(0, 12)}</h4>
                <span>&gt;</span>
              </div>
              <input
                type="text"
                value={profile.url}
                readOnly={!isEditing || editingId !== profile.id}
                onChange={(e) => handleProfileChange(profile.id, e.target.value)}
              />
              <div className="profile-actions">
                <i className="bx bxs-edit" onClick={() => handleEditProfile(profile.id)}></i>
                <i className="bx bxs-trash" onClick={() => handleDeleteProfile(profile.id)}></i>
              </div>
            </div>
          ))}
        </div>
        {showNewProfileForm ? (
          <div className="add-profile">
            <select
              name="name"
              value={newProfile.name}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Profile Name</option>
              {Object.keys(socialIcons).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="url"
              placeholder="Profile URL"
              value={newProfile.url}
              onChange={handleInputChange}
              required
            />
            <button className="add-btn" onClick={handleAddProfile}>
              Add New Profile
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={() => setShowNewProfileForm(true)}>
            Add New Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
