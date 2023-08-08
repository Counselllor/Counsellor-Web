import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import meeting from "../../assets/meeting.png";
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
    "user-type": ""
  })
  const [error, setError] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [captchaVal, setCaptchaVal] = useState("");
  const [captchaText, setCaptchaText] = useState("");

  // Functions for handleling inputs
  const handelUserInfo = (e)=>{
    const {name, value} = e.target;
    setUserInfo((prev)=>{
      return {...prev, [name]: value}
    })

    if(name !== "dob" && name !== "user-type" && name !== "gender"){
         const errObj = validate[name](value);
         setError((prev)=>{
          return {...prev, ...errObj};
         })
    }

  }

  const handleRegisterInformation = (e)=>{
    const {name, value} = e.target;
    setRegisterInformation((prev)=>{
      return {...prev, [name]: value}
    })
   
    let errObj = validate[name](value);
    if(name === "confirmPassword"){
      errObj = validate.confirmPassword(value, registerInformation.password);
    }
    setError((prev)=>{
      return {...prev, ...errObj}
    })
  }

  function writeUserData(userId, email, userInfo) {
    const {firstName, surname, dob, gender} = userInfo;
    const user_type = userInfo["user-type"];
    set(ref(database, 'users/' + userId), {
      firstname: firstName,
      surname: surname,
      email: email,
      dob: dob,
      gender: gender,
      user_type: user_type
    });
  }
  
  let navigate = useNavigate();


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


  const handleRegister = async (e) => {
    e.preventDefault();
    let submitable = true;
    if(captchaVal !== captchaText){
      alert("Wrong Captcha")
      setCaptchaVal("");
      genrateCaptcha();
      return;
    }

    Object.values(error).forEach((err)=>{
      if(err !== false){
        submitable = false;
        return;
      }
    })

    if(submitable){
        const userId = uid();
        writeUserData(userId, registerInformation.email, userInfo);
        try {
         const createUser = await createUserWithEmailAndPassword(
            auth,
            registerInformation.email,
            registerInformation.password
          );
          navigate("/");
        }
        catch(err){alert(err.message); console.log(err)}; 
      }else{
        alert("Please fill all Fields with Valid Data.")
      }
  };

  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
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
            <div>
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
                {error.firstName && error.firstNameError && <p className="errorShow">{error.firstNameError}</p>}
            </div>
           
            <div>
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
              {error.surname && error.surnameError && <p className="errorShow">{error.surnameError}</p>}
            </div>
             
            </div>

          <div>
          <input
              type="email"
              name="email"
              value={registerInformation.email}
              onChange={handleRegisterInformation}
              required
              placeholder="Email"
              className={error.emailError && "inputField"}
            />
            {error.email && error.emailError && <p className="errorShow">{error.emailError}</p>}
          </div>
           
            <div className="password-input">
            <div style={{position: "relative"}}>
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
            <div onClick={passwordToggle} className="toggle-button1">
                <img
                  height={20}
                  width={20}
                  src={passwordType === "password" ? hide : show}
                  alt="password-toggle"
                />
              </div>
              
            </div>
            {error.password && error.passwordError && <p className="errorShow">{error.passwordError}</p>}
          
            </div>
            
            <div>
            <input
              type={passwordType}
              name="confirmPassword"
              value={registerInformation.confirmPassword}
              onChange={handleRegisterInformation}
              required
              placeholder="Confirm Password"
              className={`password-text  ${
                error.confirmPasswordError && "inputField"
              }`}
            />
             {error.confirmPassword && error.confirmPasswordError && <p className="errorShow">{error.confirmPasswordError}</p>}
            </div>
          

            <label htmlFor="date-of-birth">Date of birth</label>
            <input
              type="date"
              value={userInfo.dob}
              name="dob"
              onChange={handelUserInfo}
              required
            />

            <select
              type="gender"
              name="gender"
              value={userInfo.gender}
              onChange={handelUserInfo}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="student-or-counsellor">
              Are you Student or Counsellor ?{" "}
            </label>
            <div className="name soc">
              <span htmlFor="student-option">
                Student
                <input
                  type="radio"
                  className= "student-option"
                  name="user-type"
                  value="student"
                  id = "student-option"
                  onChange={handelUserInfo}
                  required
                ></input>
              </span>

              <span htmlFor="counsellor-option">
                Counsellor
                <input
                  type="radio"
                  className="counsellor-option"
                  name="user-type"
                  value="counsellor"
                  id = "counsellor-option"
                  onChange={handelUserInfo}
                  required
                ></input>
              </span>
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
                  name="captcha"
                  value={captchaVal}
                  placeholder="Enter Captcha Here"
                  onChange={(e) => setCaptchaVal(e.target.value)}
                  className="w-[100%] bg-slate-100 py-2 px-4 focus:outline-indigo-500"
                  required
                />
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
          <img src={meeting} alt="meeting" />
          <p className="left-text">Still Confused with College Choice?</p>
        </div>
      </div>
    </div>
        <Footer />
    </main>
  );
};

export default SignUpForm;
