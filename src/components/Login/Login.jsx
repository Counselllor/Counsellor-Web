import React, { useState } from 'react';
import ElementPhoto from '../../assets/element1.webp'
import Logo from '../../assets/logo.webp'
import GoogleLogo from '../../assets/googleicon.webp'
import WindowLogo from '../../assets/windowicon.webp'
import Githublogo from '../../assets/githubicon2.webp'
import './Login.css'
import show from "../../assets/show.png"
import hide from "../../assets/hide.png"

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, seterror] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do some authentication here...

    if(username === '')
    { seterror("User name is Required!");}
  
    else if(password === '')
    { seterror("Password is Required!");}

    else
    {
      seterror("");
      setUsername("");
      setPassword("");
    }
    
  };

  const [passwordType, setPasswordType] = useState("password");

  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    }
    else
      setPasswordType("password");
  };

  return (
    <div className="login-container">
      <div className="shadow-box">

        {/* This is the left side of the login page   */}
        <div className="left-side">
          <div className="left-side-logo">
            <img id='logo' src={Logo} alt="logo" />
            <p id='logintxt_leftside' >For the Students By the Students</p>
          </div>
          <img id='element1Img' src={ElementPhoto} alt="Element Image" />
        </div>


        {/* This is the right side of the login page   */}
        <div className="right-side">
          <div className="counsellor-text-container">Counsellor</div>
          <div className="lets-signin-text-container">Let's You Sign In!</div>
          <div className='needhelp-container'>Need Help?</div>

          {/* Login form */}


          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              className={`${error === 'User name is Required!' && "inputField"}`}
            />
            {
              error === 'User name is Required!' && (
                <small className='errorMsg'>Name is Required</small>
              ) 
            }
            <input
              type={passwordType}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className={`${error === 'Password is Required!' && "inputField"}`}
            />
             {
              error === 'Password is Required!' && (
                <small className='errorMsg'>Password is Required</small>
              ) 
            }
            <div onClick={passwordToggle} className="toggle-button">
                <img height={20} width={20} src={passwordType === "password"?hide:show}/>
            </div>
            <button type="submit">Login</button>

            {/*Login Option */}
            <div className='loginOptions'>
              <div className="or-login-with">Or login with </div>
              <div className="login-with-icons">
                <img id='googleicon' src={GoogleLogo} alt="gogoleicon" />
                <img id='windowicon' src={WindowLogo} alt="windowicon" />
                < img id="githubicon" src={Githublogo} alt="githubicon" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;




