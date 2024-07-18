import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState, useCallback, useContext} from "react";
import Tilt from 'react-parallax-tilt';
import { Link, useNavigate } from "react-router-dom";
import meeting2 from "../../assets/meeting2.png";
import hide from "../../assets/hide.png";
import show from "../../assets/show.png";
import { auth, googleAuthProvider, githubAuthProvider, database  } from "../../firebase/auth";
import { ref, get } from "firebase/database";
import "./Login.css";
import { FaSyncAlt, FaEnvelope, FaKey, FaShieldVirus } from "react-icons/fa";
import validate from "../../common/validation";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { Switch } from 'antd';
import { ThemeContext } from "../../App";
import googleIcon from "../../assets/googleIcon.png";
import githubIcon from "../../assets/githubIcon.png"; 
import { useDispatch} from "react-redux";
import { LOGIN_SUCCESS,LOGIN_FAILURE } from "../../reducers/isLoggedIn";

const fetchUserDataByEmail = async (email) => {
  try {
    // Get the user ID using the email
    const encodedEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
    const emailRef = ref(database, `email/${encodedEmail}`);
    const emailSnapshot = await get(emailRef);
    if (emailSnapshot.exists()) {
      const userId = emailSnapshot.val();
      // Fetch the user data using the user ID
      const userRef = ref(database, `users/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        return userData;
      } else {
        console.error('No user data available');
        return null;
      }
    } else {
      console.error('No user ID found for the provided email');
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default function Login() {

  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [captchaVal, setCaptchaVal] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  }); 

  // Function for handling inputs
  const handleLoginInfo = useCallback((e)=>{
    const {name, value} = e.target;
    setLoginInfo((prev)=>{
      return {...prev, [name]: value}
    })
    let errObj = validate[name](value);
    if(name === "password"){
      errObj = validate.loginPassword(value);
    }
    setError((prev)=>{
      return {...prev, ...errObj}
    })
  })

  const passwordToggle = useCallback(() => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  });

  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const userData =  await fetchUserDataByEmail(user.email);
        
        localStorage.setItem("userUid", userData.id);
        toast.success("Authenticating your credentials… 🚀",{
          className: "toast-message",
        });
        localStorage.setItem('count',true)
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    });
  }, []);

  const handleGoogleSignIn = useCallback(() => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const user = result.user;
        const userData = await fetchUserDataByEmail(user.email);
        
        if (userData) {
          // Existing user
          const userInfo = {
            id: userData.id,
            firstname: userData.firstname,
            surname: userData.surname,
            email: userData.email,
            profilePic: userData.profilePic
          };
          dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          // New user
          const userInfo = {
            id: user.uid,
            firstname: user.displayName.split(' ')[0],
            surname: user.displayName.split(' ')[1] || '',
            email: user.email,
            profilePic: user.photoURL
          };
          dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          // Here you would also save the new user data to your database
        }
  
        localStorage.setItem("userUid", user.uid);
        toast.success("Login successful!", {
          className: "toast-message",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        toast.error("An error occurred. Please try again!", {
          className: "toast-message",
        });
      });
  }, [navigate, dispatch]);

  const handleGithubSignIn = useCallback(() => {
    signInWithPopup(auth, githubAuthProvider)
      .then(async (result) => {
        const user = result.user;
        const userData = await fetchUserDataByEmail(user.email);
        
        if (userData) {
          // Existing user
          const userInfo = {
            id: userData.id,
            firstname: userData.firstname,
            surname: userData.surname,
            email: userData.email,
            profilePic: userData.profilePic
          };
          dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          // New user
          const userInfo = {
            id: user.uid,
            firstname: user.displayName.split(' ')[0],
            surname: user.displayName.split(' ')[1] || '',
            email: user.email,
            profilePic: user.photoURL
          };
          dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          // Here you would also save the new user data to your database
        }
  
        localStorage.setItem("userUid", user.uid);
        toast.success("Login successful!", {
          className: "toast-message",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        console.error("Github Sign-In Error:", error);
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        toast.error("An error occurred. Please try again!", {
          className: "toast-message",
        });
      });
  }, [navigate, dispatch]);

  const generateCaptcha = useCallback(()=>
    {
      let captcha = "";
      const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      captcha += charset.charAt(randomIndex);
    }
    setCaptchaText(captcha)
    })

    useEffect(()=>{
      generateCaptcha();
    }, [])

    const fetchUserData = async (uid) => {
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        localStorage.setItem('Userid', userData.id);
      } else {
        console.error('No data available');
      }
    };
  
  // if signin with EmailId/password success then navigate to /dashboard
  const handleSignIn = useCallback((e) => {
     e.preventDefault();
     let submitable = true;
     if(captchaVal !== captchaText){
      toast.error("Wrong Captcha",{
        className: "toast-message",
      })
      setCaptchaVal("");
      generateCaptcha();
      return;
    }

    Object.values(error).forEach((err)=>{
      if(err !== false){
        submitable = false;
        return;
      }
    })
    if(submitable){
      signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then(() => {
          setTimeout(() => {
            const user=localStorage.getItem("userUid");
            fetchUserData(user.uid); // Fetch user data after login
            localStorage.setItem('login',true)
            navigate("/dashboard");
          }, 2000);
        })
        .catch((err) => {
          if (err.code === "auth/wrong-password") {
            toast.error("Incorrect Password!",{
              className: "toast-message",
            });
          } else if (err.code === "auth/user-not-found") {
            toast.error("This email is not registered",{
              className: "toast-message",
            });
          } else {
            console.error("Sign-in error", err);
            toast.error("An error occurred. Please try again!",{
              className: "toast-message",
            });
          }
        });
      }else{
        toast.error("Please fill all Fields with Valid Data.",{
          className: "toast-message",
        })
      }
  });
  // Popup Google signin
  const SignInGoogle = useCallback(() => {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        toast.success("Login successful !",{
          className: "toast-message",
        })
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => toast.error(err.message,{
        className: "toast-message",
      }));
  });

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Theme toggle function
  const handleThemeChange = () => {
    toggleTheme(); 
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <main>
    <div className="login-container">
      <div className="parent">
        {/* Home icon */}
        {/* This is the right side of the login page   */}
        <ToastContainer/>
        <div className="right">
          <h1 className="counsellor">Counsellor
          <span>&nbsp;&nbsp;&nbsp;&nbsp;<Switch 
            style={{ backgroundColor: theme === "dark" ? "#000000" : ""}} 
            onChange={handleThemeChange} 
            checked={theme === "dark"} 
            checkedChildren="Dark Mode" 
            unCheckedChildren="Light Mode" 
          /></span>
          </h1>
          <div className="sign-in">Log in to your account</div>

          {/* Login form */}
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
              className={`${error.emailError && "inputField"}`}
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
                className={`${error.passwordError && "inputField"}`}
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
              {error.password && error.passwordError && <p className="errorShow">{error.passwordError}</p>}
            </div>       
            </div>
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
                  onClick={generateCaptcha}
                />
                <div className="iconContainer">
                <input
                  type="text"
                  name="captch"
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
          <div className="or-line">
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <div className="social-login">
            <div className="social-btn google-btn" onClick={handleGoogleSignIn}>
              <img src={googleIcon} alt="Google" className="social-icon" />
            </div>
            <div className="social-btn github-btn" onClick={handleGithubSignIn}>
              <img src={githubIcon} alt="GitHub" className="social-icon" />
            </div>
          </div>

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
              {/* <div className="get-app-title">Get the app.</div> */}
              {/* <div className="apps">
                <Link to="/">
                  <img className="microsoft-logo" src={microsoft} alt="" />
                </Link>
                <Link to="/">
                  <img className="google-play-logo" src={googlePlay} alt="" />
                </Link>
              </div> */}
            </div>
        </div>
           {/* This is the left side of the login page   */}
           <div className="left">
           <Tilt>
           <img src={meeting2} alt="meeting" />
           </Tilt>
          {/* <p className="left-text">Still Confused with College Choice?</p> */}
        </div>
      </div>
    </div>
    <Footer />
    </main>
  );
};