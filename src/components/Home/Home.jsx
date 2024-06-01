import React from 'react';
import Typewriter from 'typewriter-effect';
import MeetingPhoto from '../../assets/meeting.webp';
import Navbar from '../Navbar/Navbar';
import './Home.css';
 function handleOnInit(typewriter){
  typewriter.typeString("Still Confused with College Choice?")
 .pauseFor(10)
 .start();
    
}

const Home = () => {
    return (
        <>
            <Navbar />
            <div id='homeCircle'/>
            <div id='homeContainer'>
                <img id='meetingImg' src={MeetingPhoto} alt="Meeting Pic" />
                <div className="MainText">
                    <Typewriter
                        onInit={handleOnInit}
                    />
                </div>
            </div>
            <div id='homeCircleScnd'/>
        </>
    )
}

export default Home