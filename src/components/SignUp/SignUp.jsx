import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import meeting from "../../assets/meeting.png";
import "./Signup.css";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [error, seterror] = useState("");

  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (firstName === "") {
      seterror("**First Name is Required!");
    } else if (surname === "") {
      seterror("**Surname is Required!");
    } else if (email === "") {
      seterror("**Email is Required!");
    } else if (password === "") {
      seterror("**Password is Required!");
    } else if (dob === "") {
      seterror("**D.O.B is Required!");
    } else if (gender === "") {
      seterror("**Select Gender!");
    } else {
      console.log("First name:", firstName);
      console.log("Surname:", surname);
      console.log("Email address:", email);
      console.log("Password:", password);
      console.log("DOB:", dob);
      console.log("Gender:", gender);
      seterror("");
      PostData();
      navigate("/");
    }
  }

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

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className={`password-text  ${
                error === "**Password is Required!" && "inputField"
              }`}
            />

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
              Are you Student or Counsellor ?{" "}
            </label>
            <div className="name soc">
              <span htmlFor="student-option">
                Student
                <input
                  type="radio"
                  class="student-option"
                  name="student"
                  value="1"
                  id=""
                ></input>
              </span>

              <span htmlFor="counsellor-option">
                Counsellor
                <input
                  type="radio"
                  class="counsellor-option"
                  name="Counsellor"
                  value="2"
                  id=""
                ></input>
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
