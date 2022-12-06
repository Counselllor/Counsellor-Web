import MeetingPhoto from '../assets/meeting.png'
import '../styles/App.css'

const Home = () => {
    return(
        <div>
            <img id='meetingImg' src={MeetingPhoto} alt="Meeting Image" />
            <p id='homeTxt'>Still Confused with College Choice?</p>
        </div>
    )
}

export default Home