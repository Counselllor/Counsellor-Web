import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { signOut} from "firebase/auth";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase/auth";
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

const Contact = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
let name=useRef()
let lastname=useRef()
let feedback=useRef()
let email=useRef()
    const navigate = useNavigate();
    const handleThemeChange = useCallback(() => {
      toggleTheme();
    }, [toggleTheme]);
    let [isLoggedIn,setLogin]=useState(false)
    useEffect(() => {
      if(localStorage.getItem('login')){
  
        setLogin(true)
      }
      // auth.onAuthStateChanged((user) => {
      //   if (user) {
      //     // handle user logged in state
      //   } else {
          
      //   }
      // });
    }, [navigate]);
  let form=useRef()
    // useEffect(() => {
    //   auth.onAuthStateChanged((user) => {
    //     if (user) {
    //       // read
    //     } else if (!user) {
    //       navigate("/");
    //     }
    //   });
    // }, []);
   
  async function handleSubmit(e) {
    e.preventDefault();
    let params = {
      name:name.current.value,
      email: email.current.value,
      feedback: feedback.current.value,
    };
   await  emailjs.send("service_kszura2", "template_u8shl9d", params, {
      publicKey: "rSYpY_RsF76o4MgcA",
    });
    console.log('sddddddddddddddddd')
    toast.success("Feedback Sent We will connect with you soon ! 🚀", {
      className: "toast-message",
    });
    name.current.value=""
    feedback.current.value=""
    email.current.value=''

  }
 
    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem('login')
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
            {!isLoggedIn&&  <li><a href="/" onClick={handleSignOut}>Login</a></li>}
          {
isLoggedIn&&<>

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
            </li> </>} 
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>
      </nav>
        {/* <nav className="navbar">
      .catch((err) => {
        alert(err.message);
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <main>
      <Navbar />
      {/* <nav className="navbar">

          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? 'show' : ''}`}>
            <ul>
              
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
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
            <div className={`bar ${menuOpen ? 'open' : ''}`}/>
          </div>
        </nav> */}
      {/* <div className='contact-page'>
       
      <section id="contact">
  <div class="contact-box">
    <div class="contact-clinks">
      <h2 className='ch2'>CONTACT</h2>
      <div class="clinks">
        <div class="clink">
          <FaLinkedin />
        </div>
        <div class="clink">
          <FaGithub />
        </div>
        <div class="clink">
          <MdEmail />
          
        </div>
      </div>
    </div>
    <div class="contact-form-wrapper">
      <form id='form' ref={form}>
        <div class="cform-item">
          <input className='cinput' type="text" name="name" required/>
          <label className='clabel'>Name:</label>
        </div>
        <div class="cform-item">
          <input className='cinput' type="text" name="email" required/>
          <label className='clabel'>Email:</label>
        </div>
        <div class="cform-item">
          <textarea id='m-textarea' className='ctextarea' class="" name="feedback" required/>
          <label className='clabel'>Message:</label>
        </div>
        <button class="csubmit-btn" onClick={handleSubmit}>Send</button>  
      </form>
    </div>
  </div>
</section>


    </div> */}
      <div className="contact1">
      <ToastContainer />
        <div className="left">
          <h1>Contact Us </h1>
          <p>
            Email , Call or compete the form to learn how counsellor can solve
            your problem{" "}
          </p>
          <span>Counsellor@gmail.com</span>
          <span>xxxxx-xxxxx</span>
          <div className="customer" style={{ display: "flex", gap: "20px" }}>
            <div className="left1">
              <h1 style={{ fontSize: "20px" }}>Customer Support</h1>
              <p>
                Our Support Team is Available around the clock to address any
                concerns or queries
              </p>
            </div>
            <div className="left1">
              <h1 style={{ fontSize: "20px" }}>Feedback And Suggestions</h1>
              <p>
           We Value Your Feedback and working to continuously improving us 
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <form className="form" onSubmit={handleSubmit}> 
            <h1>Get In Touch</h1>
            <p>You can React us any time</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <input ref={name} className="name" placeholder="First Name"></input>
              <input className="name" ref={lastname} placeholder="Last name"></input>
            </div>
            <div>
              <input ref={email} placeholder="Your Email" type="email"></input>
            </div>
            <div>
              <textarea ref={feedback} placeholder="How Can i Help you ?"></textarea>
            </div>
            <button type="submit">Submit</button>
            <p style={{fontSize:"12px"}}>By Contacting Us You Value Our <b>Terms of Service </b> and <b> privacy policy</b></p>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
