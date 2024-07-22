import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import { database, storage } from "../../firebase/auth";
import { ref, get, update } from "firebase/database";
import avatar3 from "../../assets/avatar3.png";
import avatar4 from "../../assets/avatar4.png";
import techstack from "./techstack.json";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const [dates, setDates] = useState([]);
  // user info from redux store
  const userInfo = useSelector((state) => state.isAuthenticate.user);
  const [name, setName] = useState(localStorage.getItem("name") || "Alex Foam");
  const [dob, setDob] = useState(localStorage.getItem("dob") || "2000-01-21");
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("academicYear") || "3rd Year"
  );
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || avatar1
  );
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(
    JSON.parse(localStorage.getItem("skills")) || []
  );
  const [socialProfiles, setSocialProfiles] = useState([]);
  const [resumeFile, setResumeFile] = useState(
    localStorage.getItem("resumeFile") || null
  );
  const [userData, setUserData] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [userUid, setUserUid] = useState(localStorage.getItem("userUid"));

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

  console.log(userData);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData(userUid);
      if (userData) {
        setUserData(userData);
        setName(userData.firstname + " " + userData.surname || "Alex Foam");
        setDob(userData.dob || "2000-01-21");
        if (userData.profilePic) {
          setProfilePic(userData.profilePic);
        }
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const userRef = ref(database, `users/${userUid}`);
    const updates = {
      firstname: name.split(" ")[0],
      surname: name.split(" ")[1] || "",
      dob,
      academicYear,
      avatar,
      skills: selectedSkills.join(","),
    };
    if (profilePic) {
      updates.profilePic = profilePic;
    }
    await update(userRef, updates);
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

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Delete the previous profile picture if it exists
      if (profilePic) {
        const previousRef = storageRef(storage, profilePic);
        await deleteObject(previousRef).catch((error) => {
          console.error("Error deleting previous profile picture:", error);
        });
      }
      // Upload the new profile picture
      const fileExtension = file.name.split(".").pop();
      const newStorageRef = storageRef(
        storage,
        `profilepics/${userUid}.${fileExtension}`
      );
      await uploadBytes(newStorageRef, file);
      const downloadURL = await getDownloadURL(newStorageRef);

      setProfilePic(downloadURL);
      localStorage.setItem("profilePic", downloadURL);
    }
  };

  const fetchUserData = async (uid) => {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      // localStorage.setItem('Userid', userData.id);
      return userData; // Return user data
    } else {
      console.error("No data available");
      return null; // Return null if no data available
    }
  };

  const generateProfileData = () => {
    return JSON.stringify(
      {
        name,
        dob,
        academicYear,
        selectedSkills,
        socialProfiles,
        email: "counsellor@gmail.com",
        phone: "+918795768574",
        gender: "Male",
        college: "IIT Bombay",
      },
      null,
      2
    );
  };

  const downloadProfileData = () => {
    const data = generateProfileData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "profile_details.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    window.open(resumeFile, "_blank");
  };

  const handleDeleteResume = () => {
    setResumeFile(null);
    localStorage.removeItem("resumeFile");
  };

  return (
    <div className="profile-card-container">
      <div className="greeting">
        <div className="greeting-text">
          <h1>Hello, {userInfo.firstname}!</h1>
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
            <h3>Email:</h3> <p>{userInfo.email}</p>
          </div>
          <div className="about-info">
            <h3>Phone : </h3> <p>+918795768574</p>
          </div>
          <div className="about-info">
            <h3>Gender : </h3> <p>{userInfo.gender}</p>
          </div>
          <div className="about-info">
            <h3>BirthDate : </h3> <p>{userInfo.dob}</p>
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
                  style={{ display: "none" }}
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
            src={profilePic ? profilePic : avatar}
            alt="Profile"
            className="profile-image"
          />
          <h3>{name}</h3>
          <p className="title">IIT Bombay</p>
          <p className="role">Student</p>
          <div className="social-profiles">
            <a
              key={userInfo.id}
              href={userInfo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`bx bxl-${userInfo.firstname.toLowerCase()}`}></i>
            </a>
          </div>
          <div className="skills-section">
            <h2>Skills</h2>
            <ul>
              {selectedSkills.map((skill, index) => (
                <li key={index}>#{skill}</li>
              ))}
            </ul>
          </div>
          <button onClick={downloadProfileData} className="download-button">
            Download Profile Details
          </button>
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
                placeholder={userInfo.firstname + " " + userInfo.surname}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={dob}
                placeholder={userInfo.dob}
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
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicUpload}
              />
            </div>

            <div className="avatar-selection">
              <h3>Select Avatar:</h3>
              <div className="avatar-options">
                <div
                  className={`avatar-option ${
                    avatar === avatar1 ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarChange(avatar1)}
                >
                  <img src={avatar1} alt="Avatar 1" />
                </div>
                <div
                  className={`avatar-option ${
                    avatar === avatar2 ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarChange(avatar2)}
                >
                  <img src={avatar2} alt="Avatar 2" />
                </div>
                <div
                  className={`avatar-option ${
                    avatar === avatar3 ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarChange(avatar3)}
                >
                  <img src={avatar3} alt="Avatar 3" />
                </div>
                <div
                  className={`avatar-option ${
                    avatar === avatar4 ? "selected" : ""
                  }`}
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
                    className={`skill-option ${
                      selectedSkills.includes(skill) ? "selected" : ""
                    }`}
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
