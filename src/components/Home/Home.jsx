import Typewriter from 'typewriter-effect';
import MeetingPhoto from '../../assets/meeting.webp';
import Navbar from '../Navbar/Navbar';
import './Home.css';

/**
 * Initialize the typewriter effect with the main heading text
 * @param {Object} typewriter - The typewriter instance
 */
const handleOnInit = (typewriter) => {
  typewriter
    .typeString("Still Confused with College Choice?")
    .pauseFor(10)
    .start();
};

/**
 * Home component - Landing page of the application
 * @returns {JSX.Element} The rendered Home component
 */
const Home = () => {
  return (
    <>
      <Navbar />
      <div id='homeCircle' />
      <div id='homeContainer'>
        <img id='meetingImg' src={MeetingPhoto} alt="Meeting with counsellor" />
        <div className="MainText">
          <Typewriter onInit={handleOnInit} />
        </div>
      </div>
      <div id='homeCircleScnd' />
    </>
  );
};

export default Home;