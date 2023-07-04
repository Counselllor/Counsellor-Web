import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/googleicon.webp";
import "./Login.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import meeting from "../../assets/meeting.png";
import microsoft from "../../assets/microsoft.png";
import googlePlay from "../../assets/google-play.png";
import { auth,googleAuthProvider } from "../../firebase/auth";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

export default function Login() {
  const [error, seterror] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, []);

  // when email change set email to target value
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // when password change set password to target value
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // if signin with EmailId/password success then navigate to /dashboard
  const handleSignIn = () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email === "") {
      seterror("User name is Required!");
    } else if (password === "") {
      seterror("Password is Required!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
            navigate("/dashboard");
      })
      .catch((err) => alert(err.message));
    }
  };
  // Popup Google signin
  const SignInGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login-container">
      <div className="parent">
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
            <img className="googleicon" src={GoogleLogo} alt="gogoleicon" />
            <div className="login-with-google" onClick={SignInGoogle}>Login with Google</div>
          </div>
          <div className="or-line">
            <hr noshade /> OR <hr noshade />
          </div> */}

          {/* Login form */}
          <div className="form">
            <label htmlFor="user-name">Email</label>
            <input
              id = "email"
              type="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="Email"
              className={`${
                error === "User name is Required!" && "inputField"
              }`}
            />
            {error === "User name is Required!" && (
              <small className="errorMsg">Email is Required</small>
            )}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={passwordType}
              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
              className={`${error === "Password is Required!" && "inputField"}`}
            />
            {error === "Password is Required!" && (
              <small className="errorMsg">Password is Required</small>
            )}
            <div onClick={passwordToggle} className="toggle-button">
              <img
                height={20}
                width={20}
                src={passwordType === "password" ? hide : show}
              />
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me"> Remember me</label>
            </div>
            <div className="btn">
              <button className="login_btn" onClick={handleSignIn}>Login</button>
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
          </div>
        </div>
      </div>
    </div>
  );
};