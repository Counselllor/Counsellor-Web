import React, { useState } from "react";
import JobsData from "./jobs.json";
import "./Jobs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {FaTimes} from 'react-icons/fa'
const Jobs = () => {
  let [isModal,setIsModal]=useState(false)
  function handleOpenModal(){
    setIsModal(true)
    console.log('click')
  }
  function handleCLoseModal(){
    setIsModal(false)
  }
  return (
  <>  <div className="jobsPage">
      <Navbar />
      <header className="jobsPage-header">
        <h1 className="jobsPage-main-title">Available Jobs</h1>
        <p className="jobsPage-subtitle">Explore exciting career opportunities</p>
      </header>
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
<div className="modal-jobs">
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
   }  </>
  );
};

export default Jobs;
