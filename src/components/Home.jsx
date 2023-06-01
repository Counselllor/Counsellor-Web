import MeetingPhoto from '../assets/meeting.webp'
import '../styles/Home.css'

const Home = () => {
    return(
        
        <>
            <div id='homeCircle'></div>
            <div id='homeContainer'>
                <img id='meetingImg' src={MeetingPhoto} alt="Meeting Image" />
                <p id='homeTxt'>Still Confused with College Choice?</p>
            </div>
            <div id='homeCircleScnd'></div>
        </>
    )
}

export default Home