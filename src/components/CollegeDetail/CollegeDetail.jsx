import React from "react";
import "./CollegeDetail.css";

const CollegeDetail = ({ college }) => {
  return (
    <div className="collegeDetail">
      <img
        style={{ height: "400px", width: "400px", objectFit: "cover" }}
        src={college.imageUrl}
        alt=""
      />
      <div className="sideDetails">
        <p>
          <b>Total number of Students:</b> {college.totalNumberOfStudents}
        </p>
        <p>
          <b>Location:</b> {college.collegeLocation}
        </p>
        <p>
          <b>City:</b> {college.collegeCity}
        </p>
        <p>
          <b>State:</b> {college.collegeState}
        </p>
        <p>
          <b>Highest Package:</b> {college.highestPackage}
        </p>
        <p>
          <b>Average Package:</b> {college.averagePackage}
        </p>
      </div>
    </div>
  );
};

export default CollegeDetail;
