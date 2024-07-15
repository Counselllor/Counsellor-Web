import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { signOut} from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from '../Navbar/Navbar';
import './Contact.css'
import emailjs from '@emailjs/browser';
import { FaLinkedin,FaGithub} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Logo from "../../assets/logo.webp";
import { Switch } from 'antd';
import { ThemeContext } from '../../App';

const Contact = () => { 
  const [Alert,setAlert]=useState({alert:false,text:"",status:false}) 
  const { theme, toggleTheme } = useContext(ThemeContext);
 
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
    function handleSubmit(e){
      e.preventDefault();
      let params={
        name:form.current.name.value,
        email:form.current.email.value,
        feedback:form.current.feedback.value
      }
      // emailjs.send('service_kszura2',"template_u8shl9d",params ,{
      //   publicKey:"rSYpY_RsF76o4MgcA",
      // })
      async function postData() {
        const url = 'http://localhost:5000/contactUs';
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(params)
          });
          const data = await response.json();
          if(data.ok){
           handleClear(true,"Success",true)
          } 
          else{
            handleClear(true,"Something went wrong",false)
          }
        } catch (error) {
          console.log('Error during POST request:', error); 
        }
      }
       
      postData();   
      function handleClear(data,text,status){
        form.current.name.value=""
        form.current.email.value=""
        form.current.feedback.value="" 
          setAlert({alert:data,text:text,status:status}) 
          setTimeout(()=>{
            setAlert({alert:false,text:"",status:false})
          },2000)
      }
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
      <Navbar/>
      {
        Alert.alert?<div className={`Alerting ${Alert.status?"success_msg":"Fail_msg"}`}>
         <p>{Alert.text}</p>
        </div>:<></>
      } 
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
    <div className='contact-page'>
       
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


    </div>
    <Footer/>
    </main>
  )
}

export default Contact
