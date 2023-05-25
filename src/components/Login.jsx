import React, { useState } from 'react';
import ElementPhoto from '../assets/element1.webp';
import Logo from '../assets/logo.webp';
import GoogleLogo from '../assets/googleicon.webp';
import WindowLogo from '../assets/windowicon.webp';
import Githublogo from '../assets/githubicon2.webp';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do some authentication here...
  };

  // CSS styles
  const styles = `
    .left-side-logo {
      text-align: center;
    }

    #logintxt_leftside {
      text-align: center;
      margin-left: 1px;
      margin-right: 50px; /* Adjust the margin value as needed */
    }
  `;

  return (
    <div className="login-container">
      <div className="shadow-box">
        {/* This is the left side of the login page */}
        <div className="left-side">
          <div className="left-side-logo">
            <img id="logo" src={Logo} alt="logo" />
            <p id="logintxt_leftside">For the Students By the Students</p>
          </div>
          <img id="element1Img" src={ElementPhoto} alt="Element Image" />
        </div>

        {/* This is the right side of the login page */}
        <div className="right-side">
          <div className="counsellor-text-container">Counsellor</div>
          <div className="lets-signin-text-container">Let's You Sign In!</div>
          <div className="needhelp-container">Need Help?</div>

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>

            {/* Login Option */}
            <div className="loginOptions">
              <div className="or-login-with">Or login with</div>
              <div className="login-with-icons">
                <img id="googleicon" src={GoogleLogo} alt="googleicon" />
                <img id="windowicon" src={WindowLogo} alt="windowicon" />
                <img id="githubicon" src={Githublogo} alt="githubicon" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Apply CSS styles */}
      <style>{styles}</style>
    </div>
  );
};

export default LoginForm;
