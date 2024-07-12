import React, { useState, useEffect } from "react";
import "./SocialProfile.css";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/auth';

const initialProfiles = [
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
];

const socialMediaOptions = [
  "Twitter",
  "LinkedIn",
  "Behance",
  "Facebook",
  "Instagram",
  "Github",
  "LeetCode",
  "CodeForces",
  "HackerEarth",
  "HackerRank",
];

const SocialProfile = () => {
  const [profiles, setProfiles] = useState(
    JSON.parse(localStorage.getItem("profiles")) || initialProfiles
  );
  let navigate=useNavigate()
  const [newProfile, setNewProfile] = useState({ name: "", url: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // handle user logged in state
      } else {

          navigate('/');
        
      }
    });
  }, [navigate]);
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

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
    window.location.reload(); // Reload the page after adding a profile
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
    window.location.reload(); // Reload the page after deleting a profile
  };

  const handleEditProfile = (id) => {
    setEditingId(id);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setEditingId(null);
    setIsEditing(false);
    window.location.reload();
  };

  const handleUpdate = () => {
    setIsEditing(!isEditing);
  };

  const isValidUrl = (url) => {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  return (
    <div className="social-profile-container">
      <div className="social-profile-header">
        <div className="heading">
          <h2>Social Profile</h2>
          <p>You can update your social profile here</p>
        </div>
        <button onClick={handleUpdate}>
          {isEditing ? "Cancel" : "Update"}
        </button>
      </div>

      <div className="profile-list">
        {profiles.map((profile) => (
          <div key={profile.id} className="profile-item">
            <div className="icon-details">
              <i className={`bx bxl-${profile.name.toLowerCase()}`}></i>
              <h4>{profile.name.slice(0, 12)}</h4>
              <span>&gt;</span>
            </div>
            <input
              type="text"
              value={profile.url}
              readOnly={!isEditing || editingId !== profile.id}
              onChange={(e) => handleProfileChange(profile.id, e.target.value)}
            />
            <div className="btns">
              {isEditing && editingId === profile.id ? (
                <button className="Save" onClick={handleSaveProfile}>
                  <i className="bx bxs-save btn-icon"></i>
                </button>
              ) : (
                <button
                  className="Edit"
                  onClick={() => handleEditProfile(profile.id)}
                >
                  <i className="bx bxs-edit-alt btn-icon"></i>
                </button>
              )}
              {isEditing && (
                <button onClick={() => handleDeleteProfile(profile.id)}>
                  <i className="bx bxs-trash btn-icon"></i>
                </button>
              )}
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
            {socialMediaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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
  );
};

export default SocialProfile;
