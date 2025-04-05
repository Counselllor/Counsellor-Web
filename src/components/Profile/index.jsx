import React, {useEffect, useState} from "react";
import "./Profile.css";
import SocialProfile from "../ProfileComponent/SocialProfile";
import ProfileCard from "../ProfileComponent/ProfileCard";
import ProfileHeader from "./ProfileHeader";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User authenticated");
      } else {
        console.log("User not authenticated, redirecting to login");
        navigate("/");
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [navigate]);

  const toggleProfile =() => {
    setOpen(!open)
  }

  return (
    <>
      <Navbar />
      <div className="profile-body">
        <ProfileHeader toggleProfile={toggleProfile}>
          <ProfileCard open={open}/>
          <SocialProfile />
        </ProfileHeader>
      </div>
      <Footer />
    </>
  );
}
