import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import meeting2 from "../../assets/meeting2.png";
import "./ForgotPassword.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function validEmail(email) {
    let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function onChangeEvent(event){
    setEmail(event.target.value)
    if (!validEmail(event.target.value)) {
        setError("**Enter a valid E-mail!");
    } else {
        setError("");
    }
}
function ForgotPassword() {

    const [email, setEmail] = useState();
    const [error, setError] = useState({});
    const auth = getAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === undefined) {
            setError("**Enter a E-mail!");
        }
        else {
            setError("");
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Please check your email for instructions on resetting your password.');
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error resetting password');
                });
        }

    }

    return (
        <div className="login-container">
            <div className="parent">
                {/* Home icon */}
                {/* This is the left side of the login page   */}
                <div className="left">
                    <img src={meeting2} alt="meeting" />
                    <p className="left-text">Still Confused with College Choice?</p>
                </div>

                {/* This is the right side of the forgot password page   */}
                <div className="right">
                    <h1 className="counsellor">Counsellor</h1>
                    <div className="sign-in">Log in to your account</div>

                    {/* forgot password form */}
                    <form className='fp-form' onSubmit={handleSubmit}>
                        <label className="forgot_text" htmlFor="Email">Please enter your email address and and we'll send you a link to get back into your account.</label>
                        <input type="email" value={email}
                            onChange={onChangeEvent}
                            placeholder="Enter your email address" className={`common-input ${error === '**Enter a valid E-mail!' ? 'error' : ''}  ${error === '**Enter a E-mail!' ? 'error' : ''}`}
                        />
                        {error === "**Enter a E-mail!" && (
                            <small className="errorMsg">**E-mail is required!</small>
                        )}
                        {error === "**Enter a valid E-mail!" && (
                            <small className="errorMsg">**Enter a valid E-mail!</small>
                        )}
                        <div className="btn">
                            <button className="forgot_btn" type="submit">Forgot Password</button>
                            <Link to="/" className="back_to_sign_in">
                                Back to sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
