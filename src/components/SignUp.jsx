import React, { useState } from 'react';


const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('First name:', firstName);
    console.log('Surname:', surname);
    console.log('Email address:', email);
    console.log('Password:', password);
    console.log('DOB:', dob);
    console.log('Gender:', gender);
  }

  return (
    <div className="signup-container">
      <div className="shadow-box">
        <div class="parent">
          <div className="signuptxt">Sign up</div>
          <div className="signuptxt2">It's quick and easy</div>
        </div>
        <div className="signup-line"></div>



        <form className="form-container" onSubmit={handleSubmit}>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First Name"
                className='firstname-text'
              />
              
              <input 
              type="text"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              placeholder="Surname"
              className='surname-text'
            />

            <input 
            type="email"
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
            placeholder="Email address"
            />

            <input
            type="password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            placeholder="Password"
            className='password-text'
            />

            
            <input
            type="date"
            value={dob}
            onChange={(event)=>setDob(event.target.value)}
            className='dob'
            />

          <select
          type="gender"
          value={gender}
          onChange={(event)=>setGender(event.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label for="are-you-student-or-counsellor">Are you Student and Counsellor ? </label>
          <label for="student-option">Student</label>
          <label for="counsellor-option">Counsellor</label>

          <button type="submit" className='submit-button'>Sign Up</button>

              
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;