import React from 'react';
import './ModernCollegeCard.css';

// Modern College Card component with stats-grid styling
function ModernCollegeCard({ college }) {
  return (
    <div className="college-card" role="button" tabIndex="0">
      <img
        src={college.imageURL}
        alt={`${college.name} Logo`}
        className="college-logo"
      />
      <h3 className="college-name">{college.name}</h3>
      <span className="college-location">{college.location}</span>
      <div className="college-details">
        <div className="college-ctc">{college.ctc}</div>
        <div className="college-time">{college.time}</div>
      </div>
    </div>
  );
}

export default ModernCollegeCard;
