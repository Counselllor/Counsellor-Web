import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase/auth";
import { ref, get, update } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    bio: "",
    college: "",
    course: "",
    year: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (uid) => {
    try {
      setLoading(true);
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
        setFormData({
          firstname: data.firstname || "",
          surname: data.surname || "",
          bio: data.bio || "",
          college: data.college || "",
          course: data.course || "",
          year: data.year || ""
        });
      } else {
        toast.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = async () => {
    try {
      if (!auth.currentUser) {
        toast.error("You must be logged in to update your profile");
        return;
      }

      const uid = auth.currentUser.uid;
      const userRef = ref(database, `users/${uid}`);
      
      // Only update the fields that are in the form
      const updates = {
        firstname: formData.firstname,
        surname: formData.surname,
        bio: formData.bio,
        college: formData.college,
        course: formData.course,
        year: formData.year
      };

      await update(userRef, updates);
      
      // Update local state
      setUserData({
        ...userData,
        ...updates
      });
      
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        <ToastContainer />
        <div className="user-profile-content">
          <div className="user-profile-header">
            <h1>My Profile</h1>
            <p>Manage your personal information</p>
          </div>

          {loading ? (
            <div className="user-profile-loading">
              <div className="spinner"></div>
              <p>Loading your profile...</p>
            </div>
          ) : (
            <div className="user-profile-card">
              <div className="user-profile-avatar">
                <div className="avatar-circle">
                  {userData?.firstname ? userData.firstname.charAt(0).toUpperCase() : "U"}
                </div>
                <h2>{userData?.firstname} {userData?.surname}</h2>
                <p className="user-email">{userData?.email}</p>
                <p className="user-type">{userData?.user_type || "Student"}</p>
              </div>

              <div className="user-profile-details">
                <div className="details-header">
                  <h3>Personal Information</h3>
                  {!editMode && (
                    <button 
                      className="edit-button"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {editMode ? (
                  <div className="edit-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="surname"
                          value={formData.surname}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>College/University</label>
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Course</label>
                        <input
                          type="text"
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Year</label>
                      <select 
                        name="year" 
                        value={formData.year}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th Year">5th Year</option>
                        <option value="Graduated">Graduated</option>
                      </select>
                    </div>

                    <div className="form-buttons">
                      <button 
                        className="cancel-button"
                        onClick={() => {
                          setEditMode(false);
                          // Reset form data to original values
                          setFormData({
                            firstname: userData?.firstname || "",
                            surname: userData?.surname || "",
                            bio: userData?.bio || "",
                            college: userData?.college || "",
                            course: userData?.course || "",
                            year: userData?.year || ""
                          });
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-button"
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-info">
                    <div className="info-section">
                      <h4>Bio</h4>
                      <p>{userData?.bio || "No bio provided yet."}</p>
                    </div>

                    <div className="info-grid">
                      <div className="info-item">
                        <h4>College/University</h4>
                        <p>{userData?.college || "Not specified"}</p>
                      </div>
                      <div className="info-item">
                        <h4>Course</h4>
                        <p>{userData?.course || "Not specified"}</p>
                      </div>
                      <div className="info-item">
                        <h4>Year</h4>
                        <p>{userData?.year || "Not specified"}</p>
                      </div>
                      <div className="info-item">
                        <h4>Email</h4>
                        <p>{userData?.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
