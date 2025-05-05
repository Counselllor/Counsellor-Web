import React from "react";
import "./JobsSkeleton.css";

const JobsSkeleton = ({ count }) => {
  return (
    <div className="jobs-skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="jobs-skeleton-card">
          <div className="jobs-skeleton-title"></div>
          <div className="jobs-skeleton-company"></div>
          <div className="jobs-skeleton-description"></div>
          <div className="jobs-skeleton-description"></div>
          <div className="jobs-skeleton-location"></div>
          <div className="jobs-skeleton-button"></div>
        </div>
      ))}
    </div>
  );
};

export default JobsSkeleton;
