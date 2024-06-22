import React, { useEffect, useReducer, useRef, useState } from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from '../Navbar/Navbar';
import './Contact.css'
import Logo from '../../assets/logo.webp'
import emailjs from '@emailjs/browser';
const Contact = () => {
    const navigate = useNavigate();
  let form=useRef()
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
    function handleSubmit(e){
      e.preventDefault();
      let params={
        name:form.current.name.value,
        email:form.current.email.value,
        feedback:form.current.feedback.value
      }
      emailjs.send('service_kszura2',"template_u8shl9d",params ,{
        publicKey:"rSYpY_RsF76o4MgcA",
      })
    }
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
    <main>
      <Navbar/>
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
          <a><img className='cimg' src="https://i.postimg.cc/m2mg2Hjm/clinkedin.png" alt="clinkedin"/></a>
        </div>
        <div class="clink">
          <a><img className='cimg' src="https://i.postimg.cc/YCV2QBJg/github.png" alt="github"/></a>
        </div>
        <div class="clink">
          <a><img className='cimg' src="https://i.postimg.cc/NjLfyjPB/email.png" alt="email"/></a>
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
