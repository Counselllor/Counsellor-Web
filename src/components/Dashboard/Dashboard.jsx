import './Dashboard.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import collegesData from './colleges.json';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        console.log('');
      } else if (!user) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
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
        <nav className='navbar'>
          <div className='logo'>
            <img src={Logo} alt='Logo' />
          </div>
          <div className={`menu ${menuOpen ? 'show' : ''}`}>
            {/* Added NavLink to improve navigation and styling */}
            <ul>
              <li>
                <NavLink to='/universities'>Top Universities</NavLink>
              </li>
              <li>
                <NavLink to='/jobs'>Jobs</NavLink>
              </li>
              <li>
                <NavLink to='/courses'>Courses</NavLink>
              </li>
              <li>
                <NavLink to='/carrier-support'>Carrier Support</NavLink>
              </li>
              <li className='dot'>
                <NavLink to='/'>•</NavLink>
              </li>
              <li>
                <a href='#' onClick={handleSignOut}>
                  Log Out
                </a>
              </li>
              <li>
                {/* Removed <a> tag for Profile button */}
                <button className='profile_btn'>Profile</button>
              </li>
            </ul>
          </div>
          {/* Updated hamburger menu structure */}
          <div className='hamburger' onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`} />
            <div className={`bar ${menuOpen ? 'open' : ''}`} />
            <div className={`bar ${menuOpen ? 'open' : ''}`} />
          </div>
        </nav>
        <div className='maintxt'>
          <h1>
            <span className='blue'>Find your </span>Dream<br></br>College{' '}
            <span className='blue'>here!</span>
          </h1>
          <p>For the Students, By the Students</p>
        </div>
        <div className='search'>
          <div className='s_bar_c'>
            <img src='src/assets/search_icon.png' alt='' />
            <div className='vl'></div>
            <input
              type='text'
              placeholder='Type college name or university name'
            />
          </div>
          <button>Search</button>
        </div>
        <div className='navigator'>
          <span className='nearby'>Nearby</span>
          <span className='seeall'>See All</span>
        </div>
        <div className='colleges'>
          {collegesData.map((college, index) => (
            <div className='college' key={index}>
              <div className='up'>
                <img src={college.imageURL} alt='College Logo' />
                <div className='context'>
                  <p>{college.name}</p>
                  <span>{college.location}</span>
                </div>
              </div>
              <div className='down'>
                <div className='ctc'>{college.ctc}</div>
                <div className='time'>{college.time}</div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
};


export default Dashboard