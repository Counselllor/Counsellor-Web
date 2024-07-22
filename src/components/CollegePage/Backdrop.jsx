import React from "react";
import "./Backdrop.css";

const Backdrop = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="backdrop-overlay">
      <div className="backdrop-content">
        <button className="backdrop-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
