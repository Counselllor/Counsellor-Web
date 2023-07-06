import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import meeting from "../../assets/meeting.png";
import "./Signup.css";
import { auth, database } from "../../firebase/auth";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { uid } from "uid";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [usertype, setUserType] = useState("");
  const [error, seterror] = useState("");
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  function writeUserData(userId, email, firstname, surname, dob, gender, user_type) {
    set(ref(database, 'users/' + userId), {
      firstname: firstname,
      surname: surname,
      email: email,
      dob: dob,
      gender: gender,
      user_type: user_type
    });
  }
  
  let navigate = useNavigate();
  const handleRegister = () => {
    if (registerInformation.password !== registerInformation.confirmPassword) {
      seterror("**Password not same!");
      return;
    }
    if (firstName === "") {
      setError("**First Name is Required!");
    } else if (surname === "") {
      seterror("**Surname is Required!");
    } else if (registerInformation.email === "") {
      seterror("**Email is Required!");
    } else if (registerInformation.password === "") {
      seterror("**Password is Required!");
    } else if (dob === "") {
      setError("**D.O.B is Required!");
    } else if (gender === "") {
      seterror("**Select Gender!");
    } else if (usertype === "") {
      seterror("**Required");
    } else {
        const userId = uid();
        writeUserData(userId, registerInformation.email, firstName, surname, dob, gender, usertype)
        try {
          createUserWithEmailAndPassword(
            auth,
            registerInformation.email,
            registerInformation.password
          )
          // alert('User Created!!')
          navigate("/dashboard");
        }
        catch(err){alert(err.message)}; 
    }
  };
  return (
    <div className="signup-container">
      <div className="parent">
        {/* Home icon */}
        <div className="left">
          <img src={meeting} alt="meeting" />
          <p className="left-text">Still Confused with College Choice?</p>
        </div>
        <div className="right">
          <h1 className="counsellor">Counsellor</h1>
          <div className="signuptxt">Create a new account</div>
          <div className="signuptxt2">It's quick and easy.</div>

          <div className="form-container">
            <div className="errorShow"> {error && <p>{error}</p>}</div>

            <div className="name">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className={`firstname-text  ${
                  error === "**First Name is Required!" && "inputField"
                }`}
              />

              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Last Name"
                className={`surname-text  ${
                  error === "**Surname is Required!" && "inputField"
                }`}
              />
            </div>

            <input
              type="email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value
                })
              }
              placeholder="Email"
              className={error === "**Email is Required!" && "inputField"}
            />
            
            <div className="password-input">
              <input
              type="password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value
                })
              }
              placeholder="Password"
              className={`password-text  ${
                error === "**Password is Required!" && "inputField"
              } ${
                error === "**Password not same!" && "inputField"
              }`}
            />

            <input
              type="password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value
                })
              }
              placeholder="Confirm Password"
              className={`password-text  ${
                error === "**Password is Required!" && "inputField"
              } ${
                error === "**Password not same!" && "inputField"
              }`}
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
            
            <label htmlFor="date-of-birth">Date of birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`dob  ${
                error === "**D.O.B is Required!" && "inputField"
              }`}
            />

            <select
              type="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={error === "**Select Gender!" && "inputField"}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="student-or-counsellor">
              Are you a Student or Counsellor?
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
                  onChange={(e)=>{
                    setUserType(e.target.value)
                  }}
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
                  onChange={(e)=>{
                    setUserType(e.target.value)
                  }}
                ></input>
              </span>
            </div>
            <div className="btn">
              <button className="submit-button" onClick={handleRegister}>
                Sign Up
              </button>
              <div className="already-account">
                <Link to="/">Already have an account?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
