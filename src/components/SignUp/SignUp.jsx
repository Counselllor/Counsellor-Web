import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import meeting from "../../assets/meeting.png";
import "./Signup.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpForm = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    fName: "",
    sName: "",
    email: "",
    pass: "",
    dob: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!user.fName) {
      setError("**First Name is Required!");
      return;
    } else if (!user.sName) {
      setError("**Surname is Required!");
      return;
    } else if (!user.email) {
      setError("**Email is Required!");
      return;
    } else if (!user.pass) {
      setError("**Password is Required!");
      return;
    }

    setError("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, user.email, user.pass)
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

  const [passwordType, setPasswordType] = useState("password");

  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
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

          <form className="form-container">
            <div className="errorShow"> {error && <p>{error}</p>}</div>

            <div className="name">
              <input
                type="text"
                name="fName"
                value={user.fName}
                onChange={handleChange}
                placeholder="First name"
                className={`firstname-text  ${
                  error === "**First Name is Required!" && "inputField"
                }`}
              />

              <input
                type="text"
                name="sName"
                value={user.sName}
                onChange={handleChange}
                placeholder="Surname"
                className={`surname-text  ${
                  error === "**Surname is Required!" && "inputField"
                }`}
              />
            </div>

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email address"
              className={`${error === "**Email is Required!" && "inputField"}`}
            />

            <div className="password-input">
              <input
                type={passwordType}
                name="pass"
                value={user.pass}
                onChange={handleChange}
                placeholder="New password"
                className={`password-text  ${
                  error === "**Password is Required!" && "inputField"
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
              name="dob"
              value={user.dob}
              onChange={handleChange}
              className={`dob  ${
                error === "**D.O.B is Required!" && "inputField"
              }`}
            />

            <select
              type="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              className={`${error === "**Select Gender!" && "inputField"}`}
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
                  className="student-option"
                  name="student"
                  value="1"
                ></input>
              </span>

              <span htmlFor="counsellor-option">
                Counsellor
                <input
                  type="radio"
                  className="counsellor-option"
                  name="Counsellor"
                  value="2"
                ></input>
              </span>
            </div>
            <div className="btn">
              <button
                type="submit"
                className="submit-button"
                onClick={handleClick}
                disabled={submitButtonDisabled}
              >
                Sign Up
              </button>
              <div className="already-account">
                Already have an account?
                <Link to="/login">Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
