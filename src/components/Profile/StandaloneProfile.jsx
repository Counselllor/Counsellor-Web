import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./StandaloneProfile.css";
import { auth, database } from "../../firebase/auth";
import { ref, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FaEdit, FaDownload, FaUser } from "react-icons/fa";

const StandaloneProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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
        // Get the actual user data without any default values
        setUserData(snapshot.val());
        console.log("User data loaded:", snapshot.val());
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

  return (
    <>
      <Navbar />
      <div className="modern-profile-container">
        <ToastContainer />

        <div className="profile-top-section">
          <h1>User Profile</h1>
          <p>View and manage your account information</p>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your profile...</p>
          </div>
        ) : (
          <div className="modern-profile-content">
            <div className="profile-left-section">
              <div className="profile-avatar-container">
                <div className="avatar-circle">
                  {userData?.firstname ? userData.firstname.charAt(0).toUpperCase() : "U"}
                </div>
                <button className="edit-avatar-btn">
                  <FaEdit />
                </button>
              </div>
              <h2>{userData?.firstname} {userData?.surname}</h2>
              <p className="user-role">{userData?.user_type || ""}</p>
              <p className="user-college">{userData?.college || ""}</p>

              <button className="download-profile-btn">
                <FaDownload /> Download Profile Details
              </button>
            </div>

            <div className="profile-right-section">
              <div className="profile-section">
                <h3>Personal Information</h3>

                <div className="info-grid">
                  <div className="info-item">
                    <label>Name:</label>
                    <p>{userData?.firstname} {userData?.surname}</p>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <p>{userData?.email}</p>
                  </div>
                  {userData?.user_type && (
                    <div className="info-item">
                      <label>User Type:</label>
                      <p>{userData.user_type}</p>
                    </div>
                  )}
                  {userData?.dob && (
                    <div className="info-item">
                      <label>Date of Birth:</label>
                      <p>{userData.dob}</p>
                    </div>
                  )}
                  {userData?.age && (
                    <div className="info-item">
                      <label>Age:</label>
                      <p>{userData.age}</p>
                    </div>
                  )}
                  {userData?.gender && (
                    <div className="info-item">
                      <label>Gender:</label>
                      <p>{userData.gender}</p>
                    </div>
                  )}
                  {userData?.phone && (
                    <div className="info-item">
                      <label>Phone:</label>
                      <p>{userData.phone}</p>
                    </div>
                  )}
                  {userData?.college && (
                    <div className="info-item">
                      <label>College:</label>
                      <p>{userData.college}</p>
                    </div>
                  )}
                  {userData?.course && (
                    <div className="info-item">
                      <label>Course:</label>
                      <p>{userData.course}</p>
                    </div>
                  )}
                  {userData?.year && (
                    <div className="info-item">
                      <label>Academic Year:</label>
                      <p>{userData.year}</p>
                    </div>
                  )}
                </div>
              </div>

              {userData?.bio && (
                <div className="profile-section">
                  <h3>About</h3>
                  <p className="about-text">{userData.bio}</p>
                </div>
              )}

              <div className="profile-section">
                <h3>Resume</h3>
                <button className="upload-resume-btn">Upload Resume</button>
              </div>

              {userData?.skills && userData.skills.length > 0 && (
                <div className="profile-section">
                  <h3>Skills</h3>
                  <div className="skills-container">
                    {userData.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="navigation-links">
          <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StandaloneProfile;
