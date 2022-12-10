import MeetingPhoto from '../assets/meeting.png'
import '../styles/App.css'

const Home = () => {
    return(
        <>
            <img id='meetingImg' src={MeetingPhoto} alt="Meeting Image" />
            <p id='homeTxt'>Still Confused with College Choice?</p>
            <div id='homeCircle'></div>
        </>
    )
}

export default Home