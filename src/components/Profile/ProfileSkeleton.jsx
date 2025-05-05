import React from "react";
import "./ProfileSkeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="profile-skeleton-container">
      <div className="profile-skeleton-header">
        <div className="profile-skeleton-title"></div>
        <div className="profile-skeleton-subtitle"></div>
      </div>
      
      <div className="profile-skeleton-content">
        <div className="profile-skeleton-left">
          <div className="profile-skeleton-avatar"></div>
          <div className="profile-skeleton-name"></div>
          <div className="profile-skeleton-role"></div>
          <div className="profile-skeleton-college"></div>
          <div className="profile-skeleton-button"></div>
        </div>
        
        <div className="profile-skeleton-right">
          <div className="profile-skeleton-section">
            <div className="profile-skeleton-section-title"></div>
            <div className="profile-skeleton-info-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="profile-skeleton-info-item">
                  <div className="profile-skeleton-label"></div>
                  <div className="profile-skeleton-value"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="profile-skeleton-section">
            <div className="profile-skeleton-section-title"></div>
            <div className="profile-skeleton-about"></div>
            <div className="profile-skeleton-about"></div>
          </div>
          
          <div className="profile-skeleton-section">
            <div className="profile-skeleton-section-title"></div>
            <div className="profile-skeleton-resume"></div>
          </div>
          
          <div className="profile-skeleton-section">
            <div className="profile-skeleton-section-title"></div>
            <div className="profile-skeleton-skills">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="profile-skeleton-skill"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-skeleton-footer">
        <div className="profile-skeleton-back-button"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
