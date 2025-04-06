import { useEffect, useState } from "react";
import "./ProfileNew.css";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/auth";
import { ref, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User authenticated");
        fetchUserData(user.uid);
      } else {
        console.log("User not authenticated, redirecting to login");
        navigate("/");
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [navigate]);

  const fetchUserData = async (uid) => {
    try {
      setLoading(true);
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        setUserData(snapshot.val());
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
    <div className="profile-container">
      <ToastContainer />
      {loading ? (
        <div className="loading-profile">Loading profile data...</div>
      ) : (
        <div className="profile-content">
          <div className="profile-header">
            <h1>User Profile</h1>
            <p>Manage your account information</p>
          </div>

          <div className="profile-card-container">
            <div className="profile-info">
              <h2>Personal Information</h2>
              <div className="profile-details">
                <div className="profile-field">
                  <label>Name</label>
                  <p>{userData?.firstname} {userData?.surname}</p>
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <p>{userData?.email}</p>
                </div>
                <div className="profile-field">
                  <label>User Type</label>
                  <p>{userData?.user_type || "Student"}</p>
                </div>
              </div>
              <button className="edit-profile-button" onClick={() => toast.info("Edit profile functionality coming soon!")}>Edit Profile</button>
            </div>
          </div>

          <div className="profile-actions">
            <button className="danger-button" onClick={() => toast.info("Delete account functionality coming soon!")}>Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}
