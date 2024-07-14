import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import Tilt from 'react-parallax-tilt';
import { Link, useNavigate } from "react-router-dom";
import meeting2 from "../../assets/meeting2.png";
import hide from "../../assets/hide.png";
import show from "../../assets/show.png";
import { auth, database } from "../../firebase/auth";
import { ref, get } from "firebase/database";
import "./Login.css";
import { FaSyncAlt, FaEnvelope, FaKey, FaShieldVirus } from "react-icons/fa";
import validate from "../../common/validation";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { Switch } from 'antd';
import { ThemeContext } from "../../App";

const fetchUserDataByEmail = async (email) => {
  try {
    const encodedEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
    const emailRef = ref(database, `email/${encodedEmail}`);
    const emailSnapshot = await get(emailRef);
    if (emailSnapshot.exists()) {
      const userId = emailSnapshot.val();
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.val();
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default function Login() {
  const [error, setError] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [captchaVal, setCaptchaVal] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLoginInfo = useCallback((e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
    let errObj = validate[name](value);
    if (name === "password") {
      errObj = validate.loginPassword(value);
    }
    setError((prev) => ({ ...prev, ...errObj }));
  }, []);

  const passwordToggle = useCallback(() => {
    setPasswordType((prevType) => prevType === "password" ? "text" : "password");
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userData = await fetchUserDataByEmail(user.email);
          if (userData) {
            localStorage.setItem("userUid", userData.id || user.uid);
          } else {
            localStorage.setItem("userUid", user.uid);
          }
          toast.success("Authenticating your credentials… 🚀", {
            className: "toast-message",
          });
          localStorage.setItem('count', 'true');
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } catch (error) {
          console.error("Error during authentication:", error);
          toast.error("Authentication successful, but there was an issue fetching user data. Proceeding anyway.");
          localStorage.setItem("userUid", user.uid);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const generateCaptcha = useCallback(() => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setCaptchaText(captcha);
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleSignIn = useCallback(async (e) => {
    e.preventDefault();
    if (captchaVal !== captchaText) {
      toast.error("Wrong Captcha", { className: "toast-message" });
      setCaptchaVal("");
      generateCaptcha();
      return;
    }

    const submitable = Object.values(error).every(err => err === false);
    if (submitable) {
      try {
        await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password);
        toast.success("Login successful!", { className: "toast-message" });
        localStorage.setItem('login', 'true');
      } catch (err) {
        if (err.code === "auth/wrong-password") {
          toast.error("Incorrect Password!", { className: "toast-message" });
        } else if (err.code === "auth/user-not-found") {
          toast.error("This email is not registered", { className: "toast-message" });
        } else {
          console.error("Sign-in error", err);
          toast.error("An error occurred. Please try again!", { className: "toast-message" });
        }
      }
    } else {
      toast.error("Please fill all fields with valid data.", { className: "toast-message" });
    }
  }, [captchaVal, captchaText, error, loginInfo, generateCaptcha]);

  const SignInGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login successful!", { className: "toast-message" });
        setTimeout(() => navigate("/dashboard"), 2000);
      })
      .catch((err) => toast.error(err.message, { className: "toast-message" }));
  }, [navigate]);

  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <main>
      <div className="login-container">
        <div className="parent">
          <ToastContainer />
          <div className="right">
            <h1 className="counsellor">
              Counsellor
              <span>
                <Switch 
                  style={{ backgroundColor: theme === "dark" ? "#000000" : "" }} 
                  onChange={handleThemeChange} 
                  checked={theme === "dark"} 
                  checkedChildren="Dark Mode" 
                  unCheckedChildren="Light Mode" 
                />
              </span>
            </h1>
            <div className="sign-in">Log in to your account</div>

            <form className="form" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email">Email</label>
                <div className="iconContainer">
                  <input
                    id="email"
                    type="text"
                    name="email"
                    onChange={handleLoginInfo}
                    value={loginInfo.email}
                    placeholder="Email"
                    required
                    className={`${error.emailError ? "inputField" : ""}`}
                  />
                  <FaEnvelope className="icons"/>
                </div>
                {error.email && error.emailError && <p className="errorShow">{error.emailError}</p>}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <div className="iconContainer">
                    <input
                      id="password"
                      name="password"
                      type={passwordType}
                      onChange={handleLoginInfo}
                      value={loginInfo.password}
                      required
                      placeholder="Password"
                      className={`${error.passwordError ? "inputField" : ""}`}
                    />
                    <FaKey className="icons"/>
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
                {error.password && error.passwordError && <p className="errorShow">{error.passwordError}</p>}
              </div>

              <div id="captcha-container">
                <label htmlFor="captcha">Captcha</label>
                <div className="flex flex-row gap-3 justify-center items-center" id="captchaBox">
                  <div id="captcha">{captchaText}</div>
                  <FaSyncAlt id="captchaIcon" onClick={generateCaptcha} />
                  <div className="iconContainer">
                    <input
                      id="captcha"
                      type="text"
                      name="captcha"
                      value={captchaVal}
                      placeholder="Enter Captcha Here"
                      onChange={(e) => setCaptchaVal(e.target.value)}
                      className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
                      required
                    />
                    <FaShieldVirus className="icons"/>
                  </div>
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

            <button onClick={SignInGoogle} className="google_btn">
              Sign in with Google
            </button>

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
          </div>

          <div className="left">
            <Tilt>
              <img src={meeting2} alt="meeting" />
            </Tilt>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}