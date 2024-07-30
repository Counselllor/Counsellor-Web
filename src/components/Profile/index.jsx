import React, {useEffect, useState} from "react";
import "./Profile.css";
import SocialProfile from "../ProfileComponent/SocialProfile";
import ProfileCard from "../ProfileComponent/ProfileCard";
import ProfileHeader from "./ProfileHeader";
import { auth } from "../../firebase/auth";
export default function ProfilePage() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("");
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const toggleProfile =() => {
    setOpen(!open)
  }

  return (
    <div className="profile-body">
      <ProfileHeader toggleProfile={toggleProfile}>
        <ProfileCard open={open}/>
        <SocialProfile />
      </ProfileHeader>
    </div>
  );
}
