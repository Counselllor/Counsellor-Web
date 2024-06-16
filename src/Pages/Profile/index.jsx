import React, { useEffect } from "react";
import "./Profile.css";
import SocialProfile from "../../components/ProfileComponent/SocialProfile";
import ProfileCard from "../../components/ProfileComponent/ProfileCard";
import ProfileHeader from "./ProfileHeader";
import { auth } from "../../firebase/auth";
export default function ProfilePage() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("");
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="profile-body">
      <ProfileHeader>
        <ProfileCard />
        <SocialProfile />
      </ProfileHeader>
    </div>
  );
}
