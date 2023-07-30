import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googlePlay from "../../assets/google-play.png";
import hide from "../../assets/hide.png";
import meeting from "../../assets/meeting.png";
import microsoft from "../../assets/microsoft.png";
import show from "../../assets/show.png";
import { auth, googleAuthProvider } from "../../firebase/auth";
import "./Login.css";
import { FaSyncAlt } from "react-icons/fa";

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

   const [captchaVal, setCaptchaVal] = useState("");
  const [captchaText, setCaptchaText] = useState("");

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

  const genrateCaptcha = ()=>
    {
      let captcha = "";
      const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      captcha += charset.charAt(randomIndex);
    }
    setCaptchaText(captcha)
    }

    useEffect(()=>{
      genrateCaptcha();
    }, [])

  // if signin with EmailId/password success then navigate to /dashboard
  const handleSignIn = (e) => {
     e.preventDefault();
     
     if(captchaVal !== captchaText){
      alert("Wrong Captcha")
      setCaptchaVal("");
      genrateCaptcha();
      return;
    }

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
        .catch((err) => {
          if (err == "FirebaseError: Firebase: Error (auth/wrong-password).") {
            seterror("Incorrect Password!");
          }
        });
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
          {/* <div className="or-line">
            <hr noshade /> OR <hr noshade />
          </div>  */}

          {/* Login form */}
          <form className="form" onSubmit={handleSignIn}>
          <div>
          <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="Email"
              required
              className={`${
                error === "User name is Required!" && "inputField"
              }`}
            />
            {error === "User name is Required!" && (
              <small className="errorMsg">Email is Required</small>
            )}
          </div>
             <div>
             <label htmlFor="password">Password</label>
            <div className="password-input">
            <div style={{position: "relative"}}>
            <input
                id="password"
                type={passwordType}
                onChange={handlePasswordChange}
                value={password}
                required
                placeholder="Password"
                className={`${
                  error === "Password is Required!" && "inputField"
                } ${error === "Incorrect Password!" && "inputField"}`}
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
         
            </div>
            {error === "Password is Required!" && (
              <small className="errorMsg">Password is Required</small>
            )}
            {error === "Incorrect Password!" && (
              <small className="errorMsg">Incorrect Password</small>
            )}
             </div>
            <div id="captcha-container">
              <label htmlFor="captcha">Captcha</label>
              <div
                className="flex flex-row gap-3 justify-center items-center"
                id="captchaBox"
              >
                <div id="captcha">{captchaText}</div>
                <FaSyncAlt
                id="captchaIcon"
                  onClick={genrateCaptcha}
                />
                <input
                  type="text"
                  name="captch"
                  value={captchaVal}
                  placeholder="Enter Captcha Here"
                  onChange={(e) => setCaptchaVal(e.target.value)}
                  className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
                  required
                />
              </div>
            </div>
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"> Remember me</label>
            </div>
              <button className="login_btn" type="submit">
                Login
              </button>
          </form>
            <div className="btn">
              <Link to="/forgotpassword" className="forgot-password">
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
                <Link to="/">
                  <img className="microsoft-logo" src={microsoft} alt="" />
                </Link>
                <Link to="/">
                  <img className="google-play-logo" src={googlePlay} alt="" />
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};
