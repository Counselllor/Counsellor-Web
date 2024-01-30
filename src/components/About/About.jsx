import Logo from '../../assets/logo.webp'
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // read
          console.log("");
        } else if (!user) {
          navigate("/");
        }
      });
    }, []);
  
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
    <>
      <main>
        <nav className="navbar">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? 'show' : ''}`}>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Top Universities</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Carrier Support</a></li>
              <li className='dot'><a href="#">•</a></li>
              <li><a href="#" onClick={handleSignOut}>Log Out</a></li>
              <li><a href="#"><button className='profile_btn'>Profile</button></a></li>
            </ul>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          </div>
        </nav>
        <div className="maintxt" style={{padding: '0rem 11vw 15vw 11vw'}}>
          <h1><span className="blue">About </span>Us<br/></h1>
          <p>For the Students, By the Students</p>
          <p>
          Behold, for we present to you our awe-inspiring web application, crafted with the mystical powers of ReactJS. Our mission? To bestow upon students the gift of wisdom, aiding them in their quest for undergraduate enlightenment. Prepare to witness the extraordinary!
          </p>
          <p>

Within these virtual walls, students will uncover a treasure trove of streams and branches, carefully curated to match their very souls, their passions, and their wildest career aspirations. No stone shall be left unturned, no path left unexplored!

But wait, dear traveler, there's more! We bring forth the whispers of the present, the tales of those who have embarked on this hallowed journey before you. Hear the unfiltered truths, the real-life sagas, as they guide you towards the perfect college. For in the realm of education, one size does not fit all. Let your desires and preferences reign supreme!</p>
          <p>

With our divine knowledge at your fingertips, you shall seize the undergraduate throne and forge a destiny unlike any other. Unleash the power within, embrace the possibilities, and embark on the path to triumph.
</p>
          <p>
Enter our realm, intrepid adventurer, and let us be your guiding light in the boundless universe of higher education. Together, we shall illuminate your future with brilliance and triumph!
          </p>
        </div>
        
        
       
        <Footer />
      </main>
      </>
  )
}

export default About
