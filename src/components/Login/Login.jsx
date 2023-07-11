import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/googleicon.webp";
import "./Login.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import meeting from "../../assets/meeting.png";
import microsoft from "../../assets/microsoft.png";
import googlePlay from "../../assets/google-play.png";
import { auth } from "../../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const LoginForm = () => {
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState({
    email: "",
    pass: "",
  });

  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!user.email) {
      setError("**Email is Required!");
      return;
    } else if (!user.pass) {
      setError("**Password is Required!");
      return;
    }

    setError("");
    setSubmitButtonDisabled(true);

    signInWithEmailAndPassword(auth, user.email, user.pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });

    setSubmitButtonDisabled(false);
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
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
          <div className="google" onClick={loginWithGoogle}>
            <img className="googleicon" src={GoogleLogo} alt="googleicon" />
            <div className="login-with-google">Login with Google</div>
          </div>
          <div className="or-line">
            <hr /> OR <hr />
          </div>

          {/* Login form */}
          <form>
            <div className="errorMsg"> {error && <p>{error}</p>}</div>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className={`${
                error === "**Email is Required!" && "inputField"
              } common-input`}
            />
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={passwordType}
                name="pass"
                value={user.pass}
                onChange={handleChange}
                placeholder="Password"
                className={`${
                  error === "**Password is Required!" && "inputField"
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
            <div className="remember-me">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"> Remember me</label>
            </div>
            <div className="btn">
              <button
                type="submit"
                onClick={handleClick}
                disabled={submitButtonDisabled}
              >
                Login
              </button>
              <Link to="/login" className="forgot-password">
                Forgot Your password?
              </Link>
            </div>
            <div className="dont-have-account">
              Dont have an account?
              <Link to="/signup" className="forgot-password">
                Sign Up
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
