import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState, useCallback, useContext } from "react";
import Tilt from "react-parallax-tilt";
import { Link, useNavigate } from "react-router-dom";
import meeting2 from "../../assets/meeting2.png";
import { auth, database } from "../../firebase/auth";
import { ref, get } from "firebase/database";
import "../Login/Login.css";
import { FaEnvelope, FaKey, FaShieldVirus, FaSyncAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import validate from "../../common/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../action/action";
import { ThemeContext } from "../../App";
import { Switch } from "antd";
import Footer from "../Footer/Footer";

const AdminLogin = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [captchaVal, setCaptchaVal] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleCaptcha = useCallback((e) => {
    setCaptchaVal(e.target.value);
  });

  const handleLoginInfo = useCallback((e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => {
      return { ...prev, [name]: value };
    });

    const errObj = validate[name](value);
    setError((prev) => {
      return { ...prev, ...errObj };
    });

    // Hide errors while typing
    setShowErrors(false);
  });

  const passwordToggle = useCallback(() => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if user is already logged in as admin
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

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

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      let submitable = true;

      // Show errors on form submission
      setShowErrors(true);

      if (captchaVal !== captchaText) {
        toast.error("Invalid Captcha", {
          className: "toast-message",
        });
        setCaptchaVal("");
        generateCaptcha();
        return;
      }

      Object.values(error).forEach((err) => {
        if (err !== false) {
          submitable = false;
          return;
        }
      });

      if (submitable) {
        try {
          // Sign in with email and password
          await signInWithEmailAndPassword(
            auth,
            loginInfo.email,
            loginInfo.password
          );

          // Fetch user data
          const userData = await fetchUserDataByEmail(loginInfo.email);

          // Check if user is an admin
          if (userData && userData.isAdmin) {
            dispatch(loginSuccess(userData));
            localStorage.setItem("userUid", userData.id);
            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("login", true);

            toast.success("Admin login successful! 🚀", {
              className: "toast-message",
            });

            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 2000);
          } else {
            // Not an admin
            toast.error("You don't have admin privileges", {
              className: "toast-message",
            });
            auth.signOut();
          }
        } catch (err) {
          toast.error(err.message, {
            className: "toast-message",
          });
        }
      } else {
        toast.error("Please fill all fields with valid data", {
          className: "toast-message",
        });
      }
    },
    [
      captchaVal,
      captchaText,
      error,
      loginInfo.email,
      loginInfo.password,
      generateCaptcha,
      dispatch,
      navigate,
    ]
  );

  const { toggleTheme } = useContext(ThemeContext);

  // Theme toggle function
  const handleThemeChange = () => {
    toggleTheme();
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <main>
      <div className="login-container">
        <div className="parent">
          {/* This is the right side of the login page */}
          <ToastContainer />
          <div className="right">
            <h1 className="counsellor">
              Admin Portal
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
            <div className="sign-in">Admin Login</div>

            {/* Login form */}
            <form className="form" onSubmit={handleLogin}>
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
                      name="captcha"
                      value={captchaVal}
                      placeholder="Enter Captcha Here"
                      onChange={handleCaptcha}
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
                Login as Admin
              </button>
            </form>
            <div className="btn">
              <Link to="/" className="forgot-password">
                Back to Main Login
              </Link>
            </div>
          </div>
          {/* This is the left side of the login page */}
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
};

export default AdminLogin;
