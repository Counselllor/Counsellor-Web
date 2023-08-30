import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaBirthdayCake,
  FaHourglass,
  FaVideo,
  FaVenusMars,
  FaGraduationCap,
  FaUserTie,
  FaShieldVirus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import meeting2 from "../../assets/meeting2.png";
import "./Signup.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import { auth, database } from "../../firebase/auth";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { uid } from "uid";
import { FaSyncAlt } from "react-icons/fa";
import validate from "../../common/validation";
import Footer from "../Footer/Footer";

const SignUpForm = () => {
  // Input fields state value
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    surname: "",
    dob: "",
    gender: "",
    age: null,
    "user-type": "",
  });
  const [error, setError] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [confrimPasswordType, setConfirmPasswordType] = useState("password");
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaVal, setCaptchaVal] = useState("");
  const [captchaText, setCaptchaText] = useState("");

  //password toggele
  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  };
  const confirmPasswordToggle = () => {
    if (confrimPasswordType === "password") {
      setConfirmPasswordType("text");
    } else setConfirmPasswordType("password");
  };

  // Functions for handleling inputs
  const handelUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });

    if (name !== "user-type" && name !== "gender") {
      const errObj = validate[name](value);
      setError((prev) => {
        return { ...prev, ...errObj };
      });
    }

    if (name === "dob") {
      let calculateAge = ageCalculator(e.target.value);
      calculateAge === null ? (calculateAge = "") : null;
      setUserInfo((prev) => {
        return { ...prev, age: calculateAge };
      });
    }
    console.log(typeof userInfo.age);
  };

  const handleRegisterInformation = (e) => {
    const { name, value } = e.target;
    setRegisterInformation((prev) => {
      return { ...prev, [name]: value };
    });

    let errObj = validate[name](value);
    if (name === "confirmPassword") {
      errObj = validate.confirmPassword(value, registerInformation.password);
    }
    setError((prev) => {
      return { ...prev, ...errObj };
    });
  };

  function writeUserData(userId, email, userInfo) {
    const { firstName, surname, dob, gender, age } = userInfo;
    const user_type = userInfo["user-type"];
    set(ref(database, "users/" + userId), {
      firstname: firstName,
      surname: surname,
      email: email,
      dob: dob,
      gender: gender,
      age: age,
      user_type: user_type,
    });
  }

  let navigate = useNavigate();

  const genrateCaptcha = () => {
    let captcha = "";
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      captcha += charset.charAt(randomIndex);
    }
    setCaptchaText(captcha);
  };

  useEffect(() => {
    genrateCaptcha();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    let submitable = true;
    if (captchaVal !== captchaText) {
      alert("Wrong Captcha");
      setCaptchaVal("");
      genrateCaptcha();
      return;
    }

    Object.values(error).forEach((err) => {
      if (err !== false) {
        submitable = false;
        return;
      }
    });

    if (submitable) {
      const userId = uid();
      writeUserData(userId, registerInformation.email, userInfo);
      try {
        const createUser = await createUserWithEmailAndPassword(
          auth,
          registerInformation.email,
          registerInformation.password
        );
        navigate("/");
      } catch (err) {
        alert(err.message);
        console.log(err);
      }
    } else {
      alert("Please fill all Fields with Valid Data.");
    }
  };

  const ageCalculator = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 1) {
      age = null;
    }
    return age;
  };
  return (
    <main>
      <div className="signup-container">
        <div className="parent">
          <div className="right">
            <h1 className="counsellor">Counsellor</h1>
            <div className="signuptxt">Create a new account</div>
            <div className="signuptxt2">It's quick and easy.</div>

            <form className="form-container" onSubmit={handleRegister}>
              {/* <div className="errorShow"> {error && <p>{error}</p>}</div> */}

              <div className="name">
                <div className="iconContainer">
                  <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handelUserInfo}
                    placeholder="First Name"
                    className={`firstname-text  ${
                      error.firstNameError && "inputField"
                    }`}
                    required
                  />
                  <FaUser className="icons" />
                  {error.firstName && error.firstNameError && (
                    <p className="errorShow">{error.firstNameError}</p>
                  )}
                </div>

                <div className="iconContainer">
                  <input
                    type="text"
                    name="surname"
                    value={userInfo.surname}
                    onChange={handelUserInfo}
                    placeholder="Last Name"
                    className={`surname-text  ${
                      error.surnameError && "inputField"
                    }`}
                    required
                  />
                  <FaIdCard className="icons" />
                  {error.surname && error.surnameError && (
                    <p className="errorShow">{error.surnameError}</p>
                  )}
                </div>
              </div>

              <div className="iconContainer">
                <input
                  type="email"
                  name="email"
                  value={registerInformation.email}
                  onChange={handleRegisterInformation}
                  required
                  placeholder="Email"
                  className={error.emailError && "inputField"}
                />
                <FaEnvelope className="icons" />
                {error.email && error.emailError && (
                  <p className="errorShow">{error.emailError}</p>
                )}
              </div>

              <div className="password-input">
                <div className="iconContainer">
                  <input
                    type={passwordType}
                    name="password"
                    value={registerInformation.password}
                    onChange={handleRegisterInformation}
                    placeholder="Password"
                    className={`password-text  ${
                      error.passwordError && "inputField"
                    }`}
                    required
                  />
                  <FaLock className="icons" />
                  {passwordType === "password" ? (
                    <FaEyeSlash
                      className="toggle-button1"
                      onClick={passwordToggle}
                    />
                  ) : (
                    <FaEye
                      className="toggle-button1"
                      onClick={passwordToggle}
                    />
                  )}
                </div>
                {error.password && error.passwordError && (
                  <p className="errorShow">{error.passwordError}</p>
                )}
              </div>

              <div className="password-input">
                <div className="iconContainer">
                  <input
                    type={confrimPasswordType}
                    name="confirmPassword"
                    value={registerInformation.confirmPassword}
                    onChange={handleRegisterInformation}
                    required
                    placeholder="Confirm Password"
                    className={`password-text  ${
                      error.confirmPasswordError && "inputField"
                    }`}
                  />
                  <FaCheckCircle className="icons" />
                  {confrimPasswordType === "password" ? (
                    <FaEyeSlash
                      className="toggle-button1"
                      onClick={confirmPasswordToggle}
                    />
                  ) : (
                    <FaEye
                      className="toggle-button1"
                      onClick={confirmPasswordToggle}
                    />
                  )}
                  {error.confirmPassword && error.confirmPasswordError && (
                    <p className="errorShow">{error.confirmPasswordError}</p>
                  )}
                </div>
              </div>

              <div className="twoFields">
                <div>
                  <label htmlFor="date-of-birth">Date of birth</label>
                  <div className="iconContainer">
                    <input
                      type="date"
                      value={userInfo.dob}
                      name="dob"
                      onChange={handelUserInfo}
                      required
                    />
                    <FaBirthdayCake className="icons" />
                  </div>
                </div>
                <div>
                  <label htmlFor="age">Your Age</label>
                  <div className="iconContainer">
                    <input
                      type="text"
                      value={userInfo.age}
                      name="age"
                      placeholder="Auto Generted"
                      readOnly
                    />
                    <FaHourglass className="icons" />
                  </div>
                </div>
              </div>
              {error.dob && error.dobError && (
                <p className="errorShow">{error.dobError}</p>
              )}

              <div className="iconContainer">
                <select
                  type="gender"
                  name="gender"
                  value={userInfo.gender}
                  onChange={handelUserInfo}
                  required
                  className=""
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <FaVenusMars className="icons" />
              </div>

              <label htmlFor="student-or-counsellor">
                Are you Student or Counsellor ?{" "}
              </label>
              <div className="name soc">
                <div className="iconContainer">
                  <span htmlFor="student-option">
                    Student
                    <input
                      type="radio"
                      className="student-option"
                      name="user-type"
                      value="student"
                      id="student-option"
                      onChange={handelUserInfo}
                      required
                    ></input>
                  </span>
                  <FaGraduationCap
                    className="icons"
                    style={{ fontSize: "20px" }}
                  />
                </div>

                <div className="iconContainer">
                  <span htmlFor="counsellor-option">
                    Counsellor
                    <input
                      type="radio"
                      className="counsellor-option"
                      name="user-type"
                      value="counsellor"
                      id="counsellor-option"
                      onChange={handelUserInfo}
                      required
                    ></input>
                  </span>
                  <FaUserTie className="icons" />
                </div>
              </div>
              <div id="captcha-container">
                <label htmlFor="captcha">Captcha</label>
                <div
                  className="flex flex-row gap-3 justify-center items-center"
                  id="captchaBox"
                >
                  <div id="captcha">{captchaText}</div>
                  <FaSyncAlt id="captchaIcon" onClick={genrateCaptcha} />
                  <div className="iconContainer">
                    <input
                      type="text"
                      name="captcha"
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
              <div className="btn">
                <button className="submit-button" type="submit">
                  Sign Up
                </button>
                <div className="already-account">
                  <Link to="/">Already have an account?</Link>
                </div>
              </div>
            </form>
          </div>
          <div className="left">
            <img src={meeting2} alt="meeting" />
            <p className="left-text">Still Confused with College Choice?</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SignUpForm;
