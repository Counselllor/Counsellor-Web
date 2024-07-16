import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth"; // Ensure your firebase.js exports db for database reference
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from '../Navbar/Navbar';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../../assets/logo.webp";
import { Switch } from 'antd';
import { ThemeContext } from '../../App';
import { getDatabase,ref, push, set } from 'firebase/database'; // Import Firebase database functions
import Modal from 'react-modal'; // Import Modal

const Contact = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  let [isLoggedIn, setLogin] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // handle user logged in state
    //   } else {
    //   }
    // });
  }, [navigate]);

  let form = useRef();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // read
  //     } else if (!user) {
  //       navigate("/");
  //     }
  //   });
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let params = {
      name: form.current.name.value,
      email: form.current.email.value,
      feedback: form.current.feedback.value,
      created_date: new Date().toISOString() // Adding created_date
    };
    
    emailjs.send('service_kszura2', "template_u8shl9d", params, {
      publicKey: "rSYpY_RsF76o4MgcA",
    });

    // Store form data in Firebase Realtime Database
    const db=getDatabase();
    const queriesRef = ref(db, 'queries');
    const newQueryRef = push(queriesRef);
    set(newQueryRef, params)
      .then(() => {
        setIsModalOpen(true); // Open modal on successful submission
        form.current.reset();
      })
      .catch((error) => {
        console.error('Error submitting query: ', error);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('login');
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <nav className={"navbar fixed"}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li><a href="/topuniversities">Top Universities</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="./courses">Courses</a></li>
            <li><a href="/careersupport">Career Support</a></li>
            {!isLoggedIn && <li><a href="/" onClick={handleSignOut}>Login</a></li>}
            {isLoggedIn && <>
              <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
              <li><button className='profile_btn'>Profile</button></li>
              <li>
                <Switch
                  style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
                  onChange={handleThemeChange}
                  checked={theme === "dark"}
                  checkedChildren="Dark Mode"
                  unCheckedChildren="Light Mode"
                />
              </li>
            </>}
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>
      </nav>
      <div className='contact-page'>
        <section id="contact">
          <div className="contact-box">
            <div className="contact-clinks">
              <h2 className='ch2'>CONTACT</h2>
              <div className="clinks">
                <div className="clink">
                  <FaLinkedin />
                </div>
                <div className="clink">
                  <FaGithub />
                </div>
                <div className="clink">
                  <MdEmail />
                </div>
              </div>
            </div>
            <div className="contact-form-wrapper">
              <form id='form' ref={form}>
                <div className="cform-item">
                  <input className='cinput' type="text" name="name" required />
                  <label className='clabel'>Name:</label>
                </div>
                <div className="cform-item">
                  <input className='cinput' type="text" name="email" required />
                  <label className='clabel'>Email:</label>
                </div>
                <div className="cform-item">
                  <textarea id='m-textarea' className='ctextarea' name="feedback" required />
                  <label className='clabel'>Message:</label>
                </div>
                <button className="csubmit-btn" onClick={handleSubmit}>Send</button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Submission Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Thank you!</h2>
        <p>Thank you for contacting us. We will get back to you soon.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </main>
  );
};

export default Contact;
