import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import meeting from "../../assets/meeting.png";
import "./Signup.css";
import show from "../../assets/show.png";
import hide from "../../assets/hide.png";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  
  const [studop, setOption] = useState();
  const handleChange = e => {
    const target = e.target;
    if (target.checked) {
      setOption(target.value);
    }
  };

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (firstName === "") {
      setError("**First Name is Required!");
    } else if (surname === "") {
      setError("**Surname is Required!");
    } else if (email === "") {
      setError("**Email is Required!");
    } else if (password === "") {
      setError("**Password is Required!");
    } else if (dob === "") {
      setError("**D.O.B is Required!");
    } else if (gender === "") {
      setError("**Select Gender!");
    } else {
      console.log("First name:", firstName);
      console.log("Surname:", surname);
      console.log("Email address:", email);
      console.log("Password:", password);
      console.log("DOB:", dob);
      console.log("Gender:", gender);
      setError("");
      PostData();
      navigate("/");
    }
  }

  const [passwordType, setPasswordType] = useState("password");

  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  };

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      console.log({ html: "Invalid Email", classes: "#d32f2f red darken-2" });
      return;
    }
    fetch("http://localhost:4000/signup", {
      method: "post",
      "Access-Control-Allow-Origin": "http://localhost:4000/signup",
      headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '/api/signup',
        "Access-Control-Allow-Origin": "http://localhost:4000/signup",
      },
      body: JSON.stringify({
        fname: firstName,
        lname: surname,
        email,
        date: dob,
        gender,
        sc,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          // console.log({html: data.message, classes:"#43a047 green darken-1"})
          console.log(data);
          navigate("/signin");
        }
      });
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

          <form className="form-container" onSubmit={handleSubmit}>
            <div className="errorShow"> {error && <p>{error}</p>}</div>

            <div className="name">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className={`firstname-text  ${
                  error === "**First Name is Required!" && "inputField"
                }`}
              />

              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Surname"
                className={`surname-text  ${
                  error === "**Surname is Required!" && "inputField"
                }`}
              />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className={error === "**Email is Required!" && "inputField"}
            />

            <div className="password-input">
              <input
                type={passwordType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  className="student-option"
                  name="student"
                  value="1"
                  checked={studop == '1'}
                  onChange={handleChange}>
                </input>
              </span>

              <span htmlFor="counsellor-option">
                Counsellor
                <input
                  type="radio"
                  className="counsellor-option"
                  name="Counsellor"
                  value="2"
                  checked={studop == '2'}
                  onChange={handleChange}>
                </input>
              </span>
            </div>
            <div className="btn">
              <button type="submit" className="submit-button">
                Sign Up
              </button>
              <div className="already-account">
                <Link to="/login">Already have an account?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
