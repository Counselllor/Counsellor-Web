import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import GoogleLogo from "../../assets/googleicon.webp";
import "./Login.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import meeting from "../../assets/meeting.png";
import microsoft from "../../assets/microsoft.png";
import googlePlay from "../../assets/google-play.png";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do some authentication here...

    if (username === "") {
      seterror("User name is Required!");
    } else if (password === "") {
      seterror("Password is Required!");
    } else {
      seterror("");
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  const [passwordType, setPasswordType] = useState("password");

  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  };

  return (
    <div className="login-container">
      <div className="parent">
        {/* Home icon */}
        {/* This is the left side of the login page   */}
        <div className="left">
          <img src={meeting} alt="meeting" />
          <p className="left-text">Still Confused with College Choice?</p>
        </div>

        {/* This is the right side of the login page   */}
        <div className="right">
          <h1 className="counsellor">Counsellor</h1>
          <div className="sign-in">Log in to your account</div>
          {/* <div className="google">
            <img className="googleicon" src={GoogleLogo} alt="googleicon" />
            <div className="login-with-google">Login with Google</div>
          </div> */}
          <div className="or-line">
            <hr noshade /> OR <hr noshade />
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="user-name">User Name</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              className={`${
                error === "User name is Required!" && "inputField"
              } common-input`}
            />
            {error === "User name is Required!" && (
              <small className="errorMsg">Name is Required</small>
            )}
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={passwordType}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className={`${
                  error === "Password is Required!" && "inputField"
                } common-input`}
              />
              <div onClick={passwordToggle} className="toggle-button">
                <img
                  height={20}
                  width={20}
                  src={passwordType === "password" ? hide : show}
                  alt="password-toggle"
                />
              </div>
            </div>
            {error === "Password is Required!" && (
              <small className="errorMsg">Password is Required</small>
            )}
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"> Remember me</label>
            </div>
            <div className="btn">
              <button type="submit">Login</button>
              <Link to="/login" className="forgot-password">
                Forgot Your password?
              </Link>
            </div>
            <div className="dont-have-account">
              <Link to="/signup" className="forgot-password">
                Don't have an account?
              </Link>
            </div>
            <div className="get-app">
              <div className="get-app-title">Get the app.</div>
              <div className="apps">
                <Link to="/login">
                  <img className="microsoft-logo" src={microsoft} alt="" />
                </Link>
                <Link to="/login">
                  <img className="google-play-logo" src={googlePlay} alt="" />
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
