import React from "react";
import "./CoursesSkeleton.css";

const CoursesSkeleton = ({ count = 12 }) => {
  return (
    <div className="courses-skeleton-list">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="course-skeleton-card">
          <div className="course-skeleton-image"></div>
          <div className="course-skeleton-info">
            <div className="course-skeleton-title"></div>
            <div className="course-skeleton-description"></div>
            <div className="course-skeleton-description"></div>
            <div className="course-skeleton-meta">
              <div className="course-skeleton-instructor"></div>
              <div className="course-skeleton-duration"></div>
              <div className="course-skeleton-price"></div>
            </div>
            <div className="course-skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoursesSkeleton;
