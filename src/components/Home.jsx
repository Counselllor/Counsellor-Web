import MeetingPhoto from '../assets/meeting.png'
import '../styles/App.css'

const Home = () => {
    return(
        <>
            <img id='meetingImg' src={MeetingPhoto} alt="Meeting Image" />
            <p id='homeTxt'>aStill Confused with College Choice?</p>
            <div id='homeCircle'></div>
            <div id='homeCircleScnd'></div>
        </>
    )
}

export default Home