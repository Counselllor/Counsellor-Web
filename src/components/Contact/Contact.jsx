import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth} from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../../assets/logo.webp";
import { Switch } from 'antd';
import { ThemeContext } from '../../App';
import { getDatabase,ref, push, set } from 'firebase/database'; // Import Firebase database functions
import Modal from 'react-modal'; // Import Modal

const Contact = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  let name = useRef();
  let lastname = useRef();
  let feedback = useRef();
  let email = useRef();
  
  const navigate = useNavigate();
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  
  let [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
  }, [navigate]);
  
  let form = useRef();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {
      name: form.current.firstname.value +" " +form.current.lastname.value,
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
  };

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("login");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message, {
          className: "toast-message",
        });
      });
  }, [navigate]);

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
      
      <div className="contact1">
        <ToastContainer />
        <div className="left">
          <h1>Contact Us </h1>
          <p>
            Email, call or complete the form to learn how Counsellor can solve
            your problem{" "}
          </p>
          <span>Counsellor@gmail.com</span>
          <span>xxxxx-xxxxx</span>
          <div className="customer" style={{ display: "flex", gap: "20px" }}>
            <div className="left1">
              <h1 style={{ fontSize: "20px" }}>Customer Support</h1>
              <p>
                Our Support Team is available around the clock to address any
                concerns or queries.
              </p>
            </div>
            <div className="left1">
              <h1 style={{ fontSize: "20px" }}>Feedback and Suggestions</h1>
              <p>
                We value your feedback and are continuously working to improve.
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <form className="form" ref={form} onSubmit={handleSubmit}>
            <h1>Get In Touch</h1>
            <p>You can reach us any time</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <input ref={name} className="name" name="firstname" placeholder="First Name" required />
              <input className="name" ref={lastname} name="lastname" placeholder="Last name" />
            </div>
            <div>
              <input ref={email} name="email" placeholder="Your Email" type="email" required />
            </div>
            <div>
              <textarea ref={feedback} name="feedback" placeholder="How can I help you?" required />
            </div>
            <button type="submit">Submit</button>
            <p style={{fontSize:"12px"}}>By contacting us you agree to our <b>Terms of Service</b> and <b>Privacy Policy</b>.</p>
          </form>
        </div>
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
