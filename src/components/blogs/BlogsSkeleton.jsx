import React from "react";
import './BlogsSkeleton.css';

const BlogsSkeleton = ({ count }) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-title"></div>
          <div className="skeleton-date"></div>
          <div className="skeleton-summary"></div>
          <div className="skeleton-summary"></div>
          <div className="skeleton-author"></div>
          <div className="skeleton-tags"></div>
        </div>
      ))}
    </div>
  );
};

export default BlogsSkeleton;
