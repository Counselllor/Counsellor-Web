import React from "react";
import JobsData from "./jobs.json";
import "./jobs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="jobs-container">
        <header className="jobs-header">
          <h1>Available Jobs</h1>
        </header>
        <div className="job-list">
          {JobsData.map((job) => (
            <div key={job.id} className="job-card">
              <h2 className="job-title">{job.title}</h2>
              <h3 className="job-company">{job.company}</h3>
              <p className="job-location">{job.location}</p>
              <p className="job-salary">Salary: <span style={{fontWeight: 600}}>{job.salary}</span> </p>
              <p className="job-description">{job.description}</p>
              <p className="job-requirements">
                <strong>Requirements:</strong> {job.requirements}
              </p>
              <p className="job-benefits">
                <strong>Benefits:</strong> {job.benefits}
              </p>
              <p className="job-company-description">
                <strong>About Company:</strong> {job.companyDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
