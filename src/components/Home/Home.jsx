import MeetingPhoto from "../../assets/meeting.webp";
import "./Home.css";
import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import Navbar from "../Navbar/Navbar";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authorizeUser = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => {
        authorizeUser();
    };
  }, [user]);

  return user ? (
    <>
      <Navbar />
      <div id="homeCircle"></div>
      <div id="homeContainer">
        <img id="meetingImg" src={MeetingPhoto} alt="Meeting Image" />
        <div className="MainText">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Still Confused with College Choice?")
                .pauseFor(10)
                .start();
            }}
          />
        </div>
      </div>
      <div id="homeCircleScnd"></div>
    </>
  ) : (
    <></>
  );
};

export default Home;
