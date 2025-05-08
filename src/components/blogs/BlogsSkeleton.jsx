import React from "react";
import './BlogsSkeleton.css';

const BlogsSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-title"></div>
          <div className="skeleton-date"></div>
          <div className="skeleton-summary"></div>
          <div className="skeleton-summary"></div>
          <div className="skeleton-summary"></div>
          <div className="skeleton-author"></div>
          <div className="skeleton-tags"></div>
          <div className="skeleton-button" style={{ marginTop: 'auto', alignSelf: 'flex-start', width: '120px', height: '40px', borderRadius: '30px' }}></div>
        </div>
      ))}
    </>
  );
};

export default BlogsSkeleton;
