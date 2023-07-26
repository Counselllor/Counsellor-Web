import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import meeting from "../../assets/meeting.png";
import "./ForgotPassword.css";



function ForgotPassword() {

    const [email, setEmail] = useState();
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="login-container">
            <div className="parent">
                {/* Home icon */}
                {/* This is the left side of the login page   */}
                <div className="left">
                    <img src={meeting} alt="meeting" />
                    <p className="left-text">Still Confused with College Choice?</p>
                </div>

                {/* This is the right side of the forgot password page   */}
                <div className="right">
                    <h1 className="counsellor">Counsellor</h1>
                    <div className="sign-in">Log in to your account</div>

                    {/* forgot password form */}
                    <form onSubmit={handleSubmit}>
                        <label className="forgot_text" htmlFor="Email">Please enter your email address and and we'll send you a link to get back into your account.</label>
                        <input type="email" value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email address" className='common-input '
                        />
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