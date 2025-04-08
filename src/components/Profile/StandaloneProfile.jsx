import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./StandaloneProfile.css";
import { auth, database, storage } from "../../firebase/auth";
import { ref, get, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FaEdit, FaSave, FaTimes, FaFileAlt, FaTrashAlt, FaEye, FaArrowLeft } from "react-icons/fa";

const StandaloneProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    bio: "",
    college: "",
    course: "",
    year: "",
    phone: "",
    gender: "",
    dob: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // First try to get the user ID from localStorage (set during signup/login)
    const storedUserId = localStorage.getItem("userUid");

    if (storedUserId) {
      console.log("Found user ID in localStorage:", storedUserId);
      fetchUserData(storedUserId);
      return;
    }

    // If not in localStorage, try to get from Firebase auth
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Found authenticated user:", user.uid);
        fetchUserData(user.uid);
      } else {
        console.log("No authenticated user found, redirecting to home");
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async (uid) => {
    try {
      setLoading(true);
      console.log("Fetching user data for UID:", uid);

      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // Get the actual user data without any default values
        const data = snapshot.val();
        console.log("User data loaded successfully:", data);

        // Check if we have the basic required fields
        if (!data.firstname || !data.email) {
          console.warn("User data is missing essential fields:", data);
        }

        setUserData(data);

        // Initialize form data with user data
        setFormData({
          firstname: data.firstname || "",
          surname: data.surname || "",
          bio: data.bio || "",
          college: data.college || "",
          course: data.course || "",
          year: data.year || "",
          phone: data.phone || "",
          gender: data.gender || "",
          dob: data.dob || ""
        });

        // Check if user has a resume file
        if (data.resumeURL) {
          setResumeFile(data.resumeURL);
        }
      } else {
        console.error("No user data found for UID:", uid);
        toast.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    try {
      if (!auth.currentUser) {
        toast.error("You must be logged in to update your profile");
        return;
      }

      const uid = auth.currentUser.uid;
      const userRef = ref(database, `users/${uid}`);

      // Create updates object
      const updates = {
        firstname: formData.firstname,
        surname: formData.surname,
        bio: formData.bio,
        college: formData.college,
        course: formData.course,
        year: formData.year,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob
      };

      // Update the database
      await update(userRef, updates);

      // Update local state
      setUserData({
        ...userData,
        ...updates
      });

      // Exit edit mode
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (editMode) {
      // If canceling edit, reset form data to original values
      setFormData({
        firstname: userData?.firstname || "",
        surname: userData?.surname || "",
        bio: userData?.bio || "",
        college: userData?.college || "",
        course: userData?.course || "",
        year: userData?.year || "",
        phone: userData?.phone || "",
        gender: userData?.gender || "",
        dob: userData?.dob || ""
      });
    }
    setEditMode(!editMode);
  };

  // Handle resume upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setResumeLoading(true);

      // Check if user is authenticated
      if (!auth.currentUser) {
        toast.error("You must be logged in to upload a resume");
        return;
      }

      const uid = auth.currentUser.uid || localStorage.getItem("userUid");
      if (!uid) {
        toast.error("User ID not found");
        return;
      }

      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }

      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size should be less than 5MB");
        return;
      }

      // Delete previous resume if exists
      if (resumeFile) {
        try {
          // Extract the file path from the URL
          const fileRef = storageRef(storage, resumeFile);
          await deleteObject(fileRef);
        } catch (error) {
          console.error("Error deleting previous resume:", error);
          // Continue with upload even if delete fails
        }
      }

      // Upload new resume
      const fileExtension = file.name.split('.').pop();
      const resumeRef = storageRef(storage, `resumes/${uid}.${fileExtension}`);

      await uploadBytes(resumeRef, file);
      const downloadURL = await getDownloadURL(resumeRef);

      // Update user data in database
      const userRef = ref(database, `users/${uid}`);
      await update(userRef, { resumeURL: downloadURL });

      // Update state
      setResumeFile(downloadURL);
      setUserData(prev => ({ ...prev, resumeURL: downloadURL }));

      toast.success("Resume uploaded successfully");
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
    } finally {
      setResumeLoading(false);
    }
  };

  // Handle view resume
  const handleViewResume = () => {
    if (resumeFile) {
      window.open(resumeFile, "_blank");
    }
  };

  // Handle delete resume
  const handleDeleteResume = async () => {
    try {
      setResumeLoading(true);

      // Check if user is authenticated
      if (!auth.currentUser) {
        toast.error("You must be logged in to delete your resume");
        return;
      }

      const uid = auth.currentUser.uid || localStorage.getItem("userUid");
      if (!uid) {
        toast.error("User ID not found");
        return;
      }

      // Delete resume from storage
      if (resumeFile) {
        const fileRef = storageRef(storage, resumeFile);
        await deleteObject(fileRef);
      }

      // Update user data in database
      const userRef = ref(database, `users/${uid}`);
      await update(userRef, { resumeURL: null });

      // Update state
      setResumeFile(null);
      setUserData(prev => {
        const newData = { ...prev };
        delete newData.resumeURL;
        return newData;
      });

      toast.success("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    } finally {
      setResumeLoading(false);
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

              <button
                className={`edit-profile-btn ${editMode ? 'active' : ''}`}
                onClick={toggleEditMode}
              >
                {editMode ? (
                  <>
                    <FaTimes /> Cancel Editing
                  </>
                ) : (
                  <>
                    <FaEdit /> Edit Profile
                  </>
                )}
              </button>

              {editMode && (
                <button
                  className="save-profile-btn"
                  onClick={handleSaveProfile}
                >
                  <FaSave /> Save Changes
                </button>
              )}
            </div>

            <div className="profile-right-section">
              <div className="profile-section">
                <h3>Personal Information</h3>

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
                          placeholder="First Name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="surname"
                          value={formData.surname}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>College/University</label>
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          placeholder="College or University"
                        />
                      </div>
                      <div className="form-group">
                        <label>Course</label>
                        <input
                          type="text"
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          placeholder="Your Course"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Academic Year</label>
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
                  </div>
                ) : (
                  <div className="info-grid">
                    {/* Always show these fields, even if empty */}
                    <div className="info-item">
                      <label>Name:</label>
                      <p>{userData?.firstname ? `${userData.firstname} ${userData.surname || ''}` : <span className="not-provided">Not provided</span>}</p>
                    </div>
                    <div className="info-item">
                      <label>Email:</label>
                      <p>{userData?.email || <span className="not-provided">Not provided</span>}</p>
                    </div>
                    <div className="info-item">
                      <label>User Type:</label>
                      <p>{userData?.user_type || <span className="not-provided">Not specified</span>}</p>
                    </div>
                    <div className="info-item">
                      <label>Date of Birth:</label>
                      <p>{userData?.dob || <span className="not-provided">Not provided</span>}</p>
                    </div>
                    <div className="info-item">
                      <label>Gender:</label>
                      <p>{userData?.gender || <span className="not-provided">Not provided</span>}</p>
                    </div>

                    {/* Optional fields - only show if they have values */}
                    {userData?.age && (
                      <div className="info-item">
                        <label>Age:</label>
                        <p>{userData.age}</p>
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
                )}
              </div>

              <div className="profile-section">
                <h3>About</h3>
                {editMode ? (
                  <div className="form-group">
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                ) : (
                  userData?.bio ? (
                    <p className="about-text">{userData.bio}</p>
                  ) : (
                    <p className="not-provided">No bio provided yet.</p>
                  )
                )}
              </div>

              <div className="profile-section">
                <h3>Resume</h3>
                {resumeLoading ? (
                  <div className="resume-loading">
                    <div className="spinner small"></div>
                    <p>Processing resume...</p>
                  </div>
                ) : resumeFile ? (
                  <div className="resume-actions">
                    <div className="resume-info">
                      <FaFileAlt className="resume-icon" />
                      <span>Resume uploaded</span>
                    </div>
                    <button
                      className="view-resume-btn"
                      onClick={handleViewResume}
                      title="View Resume"
                    >
                      <FaEye /> View Resume
                    </button>
                    <button
                      className="delete-resume-btn"
                      onClick={handleDeleteResume}
                      title="Delete Resume"
                    >
                      <FaTrashAlt /> Delete Resume
                    </button>
                  </div>
                ) : (
                  <div className="resume-upload">
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="resume-upload" className="upload-resume-btn">
                      <FaFileAlt /> Upload Resume
                    </label>
                    <p className="resume-help-text">Upload your resume (PDF or Word, max 5MB)</p>
                  </div>
                )}
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
          <Link to="/dashboard" className="back-link">
            <FaArrowLeft /> Back to Dashboard
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StandaloneProfile;
