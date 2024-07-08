import React from "react";
import JobsData from "./jobs.json";
import "./Jobs.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="jobsPage-container">
        <header className="jobsPage-header">
          <h1>Available Jobs</h1>
        </header>
        <div className="jobsPage-list">
          {JobsData.map((job) => (
            <div key={job.id} className="jobsPage-card">
              <h2 className="jobsPage-title">{job.title}</h2>
              <h3 className="jobsPage-company">{job.company}</h3>
              <p className="jobsPage-location">{job.location}</p>
              <p className="jobsPage-salary">
                Salary: <span style={{ fontWeight: 600 }}>{job.salary}</span>{" "}
              </p>
              <p className="jobsPage-description">{job.description}</p>
              <p className="jobsPage-requirements">
                <strong>Requirements:</strong> {job.requirements}
              </p>
              <p className="jobsPage-benefits">
                <strong>Benefits:</strong> {job.benefits}
              </p>
              <p className="jobsPage-companyDescription">
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
