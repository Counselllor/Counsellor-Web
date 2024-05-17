import React from "react";
import "./Jobs.css";
import Navbar from "../Navbar/Navbar";

const Jobs = () => {
  const jobsData = [
    { id: 1, title: "Frontend Developer", location: "New York" },
    { id: 2, title: "Backend Developer", location: "San Francisco" },
    { id: 3, title: "UX Designer", location: "New York" },
    { id: 4, title: "Backend Developer", location: "Seattle" },
    { id: 5, title: "UX Designer", location: "Italy" },
    { id: 6, title: "Backend Developer", location: "Seattle" },
    { id: 7, title: "UX Designer", location: "New York" },
    { id: 8, title: "Backend Developer", location: "San Francisco" },
    { id: 9, title: "UX Designer", location: "Italy" },
    { id: 10, title: "UX Designer", location: "New York" },
    { id: 11, title: "Backend Developer", location: "San Francisco" },
    { id: 12, title: "UX Designer", location: "Italy" },
  ];

  const ApplyButton = () => {
    return <button className="apply-button">Apply Now</button>;
  };

  const JobItem = ({ job }) => {
    return (
      <div className="job-item">
        <div className="job-info">
          <h3>{job.title}</h3>
          <p>Location: {job.location}</p>
        </div>
        <ApplyButton />
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="jobs-list">
        {jobsData.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
