import MeetingPhoto from '../../assets/meeting.webp'
import './Home.css'
import React from 'react';
// import Typewriter from 'typewriter-effect';

const Home = () => {
    return(
        
        <>
            <div id='homeCircle'></div>
            <div id='homeContainer'>
                <img id='meetingImg' src={MeetingPhoto} alt="Meeting Image" />  
                <div className="MainText">
                    {/* <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString("Still Confused with College Choice?")
                                .pauseFor(10)
                                .start();
                        }}
                    /> */}
                </div>
            </div>
            <div id='homeCircleScnd'></div>
        </>
    )
}

export default Home