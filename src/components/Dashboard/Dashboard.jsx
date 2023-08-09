import './Dashboard.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.webp'
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { MdSunny, MdBrightness2 } from "react-icons/md";

const Dashboard = () => {
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

   const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };


  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty(
      "--pageColor",
      isDarkMode ? "#222222" : "#5cb6f9"
    );

    root.style.setProperty(
      "--secPageColor",
      isDarkMode ? "#000" : "#6cbdfa"
    );
  }, [isDarkMode]);
  

    return(
        
        <>
        <nav id="navbar">
        <img id='logo' src={Logo} alt="logo" />
        <ul>
        <li><NavLink className={({isActive})=>isActive?'active': 'none'}  onClick={toggleTheme}>{isDarkMode ? <MdSunny size={26}/> : <MdBrightness2 size={26} />}</NavLink></li>
        <li><NavLink className={({isActive})=>isActive?'active': 'none'} >Top Universities</NavLink></li>
        <li><NavLink className={({isActive})=>isActive?'active': 'none'} >Jobs</NavLink></li>
          <li><NavLink className={({isActive})=>isActive?'active': 'none'} >Courses</NavLink></li>
          <li><NavLink className={({isActive})=>isActive?'active': 'none'} >Carrier Support</NavLink></li>
          <li className='dot'>.</li>
          <li><NavLink className={({isActive})=>isActive?'active': 'none'} onClick={handleSignOut}>Log Out</NavLink></li>
          <li>
            <div className='myProfileBtn'><NavLink className={({isActive})=>isActive?'active': 'none'} >My Profile</NavLink></div>
          </li>
        </ul>
      </nav>

      <div className="maintxt">
        <h1><span className="blue">Find your </span>Dream<br></br>College <span className='blue'>here!</span></h1>
        <p>For the Students, By the Students</p>
      </div>

      
        <div className={`search ${isDarkMode ? "dark" : ""}`}>
            <img src="src/assets/search_icon.png" alt="" />
            <div className="vl"></div>
            
            <div className={`search ${isDarkMode ? "dark" : ""}`}>
            <input type="text" placeholder='Type college name or university name'/>
            <button>Search</button>
        </div>
        </div>
        <div className="navigator">
            <span className='nearby'>Nearby</span>
            <span className='seeall'>See All</span>
        </div>
        <br />
        <br />
        
        <div className="colleges">
            <div className={`college ${isDarkMode ? "dark" : ""}`}>
                <div className="up">
                <img src='https://i.postimg.cc/cg4NH0pV/image.png' border='0' alt='image'/>
                    <div className="context">
                        <p>Ymca Jc Bose</p>
                        <span>Faridabad</span>
                    </div>
                </div>
                <div className="down">
                    <div className="ctc">Hightest CTC - 29LPA</div>
                    <div className="time">3 min ago</div>
                </div>
            </div>
            <div className={`college ${isDarkMode ? "dark" : ""}`}>
                <div className="up">
                <img src='https://i.postimg.cc/cg4NH0pV/image.png' border='0' alt='image'/>
                    <div className="context">
                        <p>Manav Rachna</p>
                        <span>Faridabad</span>
                    </div>
                </div>
                <div className="down">
                    <div className="ctc">Hightest CTC - 23LPA</div>
                    <div className="time">3 min ago</div>
                </div>
            </div>
            <div className={`college ${isDarkMode ? "dark" : ""}`}>
                <div className="up">
                <img src='https://i.postimg.cc/cg4NH0pV/image.png' border='0' alt='image'/>
                    <div className="context">
                        <p>EIT</p>
                        <span>Faridabad</span>
                    </div>
                </div>
                <div className="down">
                    <div className="ctc">Hightest CTC - 17LPA</div>
                    <div className="time">3 min ago</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
