import MeetingPhoto from '../assets/meeting.webp'
import '../styles/App.css'

const Home = () => {
    return(
        
        <>
            <div id='homeCircle'></div>
            <div id='homeContainer'>
                <img id='meetingImg' src={MeetingPhoto} alt="Meeting Image" />
            </div>
            <div id='homeCircleScnd'></div>
        </>
    )
}

export default Home