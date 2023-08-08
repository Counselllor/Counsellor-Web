import './Dashboard.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/logo.webp'
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { MdSunny, MdBrightness2 } from "react-icons/md";
import '../../index'
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

    const root = document.documentElement;
    root.style.setProperty(
      "--pageColor",
      isDarkMode ? "#222222" : "#5cb6f9"
    );

    root.style.setProperty(
      "--secPageColor",
      isDarkMode ? "#333333" : "#6cbdfa"
    );

  };
  
  const themeStyles = `
    .theme-toggle {
      position: fixed;
     top : 80px;
    }
    .theme-toggle button {
      font-size: 2.4rem;
      width: 4rem;
      height: 4rem;
      color: #fff;
      background-color: black;
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px 5px;
      border-radius: 50%;
      position: fixed;
      bottom: 200px;
      top: 30px;
      left: 650px;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: white;
    }
  `;

    return(
        
        <>
        <style>{themeStyles}</style>
          <div className="theme-toggle">
            <button onClick={toggleTheme}>
              {isDarkMode ? <MdSunny/>: <MdBrightness2/>}
            </button>
          </div>
          
        <nav id="navbar">
        <img id='logo' src={Logo} alt="logo" />
        <ul>
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

        <div className="search">
            <img src="src/assets/search_icon.png" alt="" />
            <div className="vl"></div>
            <input type="text" placeholder='Type college name or university name'/>
            <button>Search</button>
        </div>

        <div className="navigator">
            <span className='nearby'>Nearby</span>
            <span className='seeall'>See All</span>
        </div>
        <br />
        <br />
        <div className="colleges">
            <div className="college">
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
            <div className="college">
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
            <div className="college">
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