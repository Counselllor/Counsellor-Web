import MeetingPhoto from "../../assets/meeting3.png";
import "./Home.css";
import React from "react";
import Typewriter from "typewriter-effect";
import Tilt from "react-parallax-tilt";

const Home = () => {
  return (
    <>
      <div id="homeCircle"></div>
      <div id="homeContainer">
        <Tilt className="tiltImg">
          <img id="meetingImg" src={MeetingPhoto} alt="Meeting Image" />
        </Tilt>
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
  );
};

export default Home;
