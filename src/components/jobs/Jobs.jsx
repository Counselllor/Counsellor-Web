import React, { useState } from "react";
import JobsData from "./jobs.json";
import "./Jobs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {FaTimes} from 'react-icons/fa'
const Jobs = () => {
  let [isModal,setIsModal]=useState(false)
  let [isJobModal,setIsJobModal]=useState(false)
function handleJobClose(){
  setIsJobModal(false)
}
  function handleOpenModal(){
    setIsModal(true)
    console.log('click')
  }
  function handleCLoseModal(){
    setIsModal(false)
  }
  function handlePostJob(){
    setIsJobModal(true)
  }
  return (
  <>  <div className="jobsPage">
      <Navbar />
      <header className="jobsPage-header">
        <h1 className="jobsPage-main-title">Available Jobs</h1>
        <p className="jobsPage-subtitle">Explore exciting career opportunities</p>
      </header>
      <div style={{width:"100vw",textAlign:"center"}}><button onClick={handlePostJob} style={{cursor:"pointer",margin:"auto",padding:"8px 17px",backgroundColor:"#12229d",borderRadius:"10px",color:"white"}}>Post Job</button></div>
      <section className="jobsPage-content" style={{zIndex:10}}>
        <div className="jobsPage-list">
          {JobsData.map((job) => (
            <div key={job.id} className="jobsPage-card">
              <h2 className="jobsPage-title">{job.title}</h2>
              <h3 className="jobsPage-company">{job.company}</h3>
              <p className="jobsPage-description">{job.description}</p>
              <p className="jobsPage-location">Location: {job.location}</p>
              <button className="jobsPage-apply" onClick={handleOpenModal}>Apply Now</button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
   {
isModal&&<>
<div className="modal-jobs" >
  <FaTimes onClick={handleCLoseModal} style={{position:"absolute",right:"20px",top:"20px",cursor:"pointer",}} size={'2rem'}/>
<div className="jobs-container">
  <h1>Application Form</h1>
  <form className="modal-form" >
    <div className="form-group">
      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        id="name"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
      
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="resume">Upload Resume</label>
      <input
        type="file"
        id="resume"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="coverLetter">Cover Letter</label>
      <textarea
        id="coverLetter"
        required
      ></textarea>
    </div>
    <button type="submit" className="submit-button">Submit Application</button>
  </form>
</div>
</div>
<div className="blackb"></div></>
   } 
     {
isJobModal&&<>
<div className="modal-jobs" style={{overflowY:"scroll",overflowX:"hidden"}}>
  <FaTimes onClick={handleJobClose} style={{position:"absolute",right:"20px",top:"20px",cursor:"pointer",}} size={'2rem'}/>
<div className="jobs-container"   >
  <h1   style={{overflow:"scroll"}}>Add Job</h1>
  <form className="modal-form"  >
    <div className="form-group">
      <label htmlFor="name">Job Title</label>
      <input type="text" id="jobTitle" name="jobTitle" required/>

    </div>
    <div className="form-group">
      <label htmlFor="email">Job Description</label>
      <textarea id="jobDescription" name="jobDescription" rows="5" required></textarea>

    </div>
    <div className="form-group">
      <label>Company Name</label>
      <input type="text" id="companyName" name="companyName" required />

    </div>
    <div className="form-group">
      <label htmlFor="location">Location</label>
      <input type="text" id="location" name="jobSalary" required />

    </div>
    <div className="form-group">
      <label htmlFor="phone">Job Salary</label>
      <input type="text" id="jobSalary" name="jobSalary" required />

    </div>
    <div className="form-group">
      <label>Job Type</label>
    <select id="jobType" name="jobType" required>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                </select>
    </div>
    <div className="form-group">
    <label htmlFor="experienceLevel">Experience Level</label>
                <select id="experienceLevel" name="experienceLevel" required>
                    <option value="entry">Entry</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                </select>
    </div>
    <div className="form-group">
    <div class="form-group">
                <label for="applicationDeadline">Application Deadline</label>
                <input type="date" id="applicationDeadline" name="applicationDeadline" required/>
            </div>
     </div>
    <button type="submit" className="submit-button">Submit Job</button>
  </form>
</div>
</div>
<div className="blackb"></div></>
   }   </>
  );
};

export default Jobs;
