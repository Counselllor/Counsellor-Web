import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from "react";
import Tilt from "react-parallax-tilt";
import { Link, useNavigate } from "react-router-dom";
import meeting2 from "../../assets/meeting2.png";
import { auth, database } from "../../firebase/auth";
import { ref, get, update } from "firebase/database";
import "./Login.css";
import { FaSyncAlt, FaEnvelope, FaKey, FaShieldVirus, FaEye, FaEyeSlash } from "react-icons/fa";
import validate from "../../common/validation";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { Switch } from "antd";
import { ThemeContext } from "../../App";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../action/action";

const fetchUserDataByEmail = async (email) => {
  try {
    // Get the user ID using the email
    const encodedEmail = email.replace(/[^a-zA-Z0-9]/g, "_");
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
        console.error("No user data available");
        return null;
      }
    } else {
      console.error("No user ID found for the provided email");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const fetchUserData = async (userId) => {
  try {
    if (!userId) {
      console.error("No user ID provided");
      return null;
    }

    const userRef = ref(database, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      return userData;
    } else {
      console.error("No user data available for ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default function Login() {
  const [error, setError] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [captchaVal, setCaptchaVal] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Function for handling inputs
  const handleLoginInfo = useCallback(
    (e) => {
      const { name, value } = e.target;
      let errObj;

      // Validate based on input name
      if (name === "password") {
        errObj = validate.loginPassword(value);
      } else {
        errObj = validate[name](value);
      }

      // Update loginInfo and error state
      setLoginInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
      setError((prev) => ({
        ...prev,
        ...errObj,
      }));

      // Hide errors while typing
      setShowErrors(false);
    },
    [validate]
  );

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
        const userData = await fetchUserDataByEmail(user.email);

        dispatch(loginSuccess(userData));

        localStorage.setItem("userUid", userData.id);

        toast.success("Authenticating your credentials… 🚀", {
          className: "toast-message",
        });
        localStorage.setItem("login", true);
        localStorage.setItem("count", true);

        // Redirect based on user type
        setTimeout(() => {
          if (userData.user_type === "counsellor") {
            navigate("/counsellor/dashboard");
          } else {
            navigate("/dashboard");
          }
        }, 2000);
      }
    });
  }, []);

  const generateCaptcha = useCallback(() => {
    let captcha = "";
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      captcha += charset.charAt(randomIndex);
    }
    setCaptchaText(captcha);
  });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const fetchUserData = async (uid) => {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      localStorage.setItem("Userid", userData.id);
      return userData; // Return the user data
    } else {
      console.error("No data available");
      return null;
    }
  };

  // Function to fetch user data by email
  const fetchUserDataByEmail = async (email) => {
    try {
      // Get a reference to the users node in the database
      const usersRef = ref(database, 'users');

      // Get all users
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();

        // Find the user with the matching email
        for (const userId in users) {
          if (users[userId].email === email) {
            const userData = users[userId];
            return userData;
          }
        }
      }

      console.error("No user found with that email");
      return null;
    } catch (error) {
      console.error("Error fetching user data by email:", error);
      return null;
    }
  };

  const dispatch = useDispatch();

  // if signin with EmailId/password success then navigate to dashboard based on user type
  const handleSignIn = useCallback(async (e) => {
    e.preventDefault();

    // Show errors on form submission
    setShowErrors(true);

    // Validate captcha
    if (captchaVal !== captchaText) {
      toast.error("Wrong Captcha", {
        className: "toast-message",
      });
      setCaptchaVal("");
      generateCaptcha();
      return;
    }

    // Check for validation errors
    let hasErrors = false;
    Object.values(error).forEach((err) => {
      if (err !== false) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      toast.error("Please fill all fields with valid data", {
        className: "toast-message",
      });
      return;
    }

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );

      // Get the Firebase user
      const firebaseUser = userCredential.user;
      console.log("Firebase user:", firebaseUser);

      // Get user data from database using email
      const userData = await fetchUserDataByEmail(loginInfo.email);
      console.log("User data from database:", userData);

      if (!userData) {
        console.error("Failed to fetch user data");
        toast.error("Login failed. Please try again.", {
          className: "toast-message",
        });
        return;
      }

      // Store user ID in localStorage
      localStorage.setItem("userUid", userData.id);
      dispatch(loginSuccess(userData));
      localStorage.setItem("login", true);

      // Show success message
      toast.success("Login successful!", {
        className: "toast-message",
      });

      // Ensure user_type exists and is valid
      let userType = userData.user_type;
      if (!userType || (userType !== "student" && userType !== "counsellor")) {
        console.warn("Invalid or missing user type:", userType, "defaulting to 'student'");
        userType = "student";

        // Update the user data in the database with the default user type
        try {
          const userRef = ref(database, `users/${userData.id}`);
          await update(userRef, { user_type: userType });
          console.log("Updated user with default user type");
        } catch (updateError) {
          console.error("Failed to update user type:", updateError);
        }
      }

      console.log("User type during login:", userType);

      // Redirect based on user type after a short delay
      setTimeout(() => {
        if (userType === "counsellor") {
          console.log("Redirecting to counsellor dashboard");
          navigate("/counsellor/dashboard");
        } else {
          console.log("Redirecting to regular dashboard");
          navigate("/dashboard");
        }
      }, 1000);

    } catch (err) {
      // Handle authentication errors
      if (err.code === "auth/wrong-password") {
        toast.error("Incorrect Password!", {
          className: "toast-message",
        });
      } else if (err.code === "auth/user-not-found") {
        toast.error("This email is not registered", {
          className: "toast-message",
        });
      } else {
        console.error("Sign-in error", err);
        toast.error("An error occurred. Please try again!", {
          className: "toast-message",
        });
      }
    }
  }, [captchaVal, captchaText, error, loginInfo.email, loginInfo.password, generateCaptcha, dispatch, navigate]);


  const { theme, toggleTheme } = useContext(ThemeContext);

  // Theme toggle function
  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <main>
      <div className="login-container">
        <div className="parent">
          {/* Home icon */}
          {/* This is the right side of the login page   */}
          <ToastContainer />
          <div className="right">
            <h1 className="counsellor">
              Counsellor
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;
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

            {/* Login form */}
            <form className="form" onSubmit={handleSignIn}>
              <div>
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
                  <FaEnvelope className="icons" />
                </div>

                {showErrors && error.email && error.emailError && (
                  <p className="errorShow">{error.emailError}</p>
                )}
              </div>
              <div>
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
                    <FaKey className="icons" />
                    {passwordType === "password" ? (
                      <FaEyeSlash
                        className="toggle-button"
                        onClick={passwordToggle}
                      />
                    ) : (
                      <FaEye
                        className="toggle-button"
                        onClick={passwordToggle}
                      />
                    )}
                    {showErrors && error.password && error.passwordError && (
                      <p className="errorShow">{error.passwordError}</p>
                    )}
                  </div>
                </div>
              </div>
              <div id="captcha-container">
                <div
                  className="flex flex-row gap-3 justify-center items-center"
                  id="captchaBox"
                >
                  <div id="captcha">{captchaText}</div>
                  <FaSyncAlt id="captchaIcon" onClick={generateCaptcha} />
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
                    <FaShieldVirus className="icons" />
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
}
