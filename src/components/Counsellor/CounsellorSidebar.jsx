import React from "react";
import { FaUserGraduate, FaCalendarAlt, FaBook, FaSignOutAlt, FaUser, FaPhone, FaComments, FaStar, FaUserEdit } from "react-icons/fa";
import { RiDashboardLine, RiUserLine, RiCalendarLine, RiBookLine, RiCalendarCheckLine, RiMessageLine, RiUserSettingsLine } from "react-icons/ri";
import "./CounsellorSidebar.css";

const CounsellorSidebar = ({ activeTab, onTabChange, onSignOut, userData }) => {
  return (
    <div className="counsellor-sidebar">
      <div className="counsellor-sidebar-header">
        <div className="counsellor-profile">
          <div className="counsellor-avatar-container">
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt="Profile"
                className="counsellor-avatar"
              />
            ) : (
              <FaUser className="counsellor-avatar-icon" />
            )}
          </div>
          <div className="counsellor-info">
            <h2>{userData ? `${userData.firstname} ${userData.surname}` : "Counsellor"}</h2>
            <p className="counsellor-email">{userData?.email || "loading..."}</p>
          </div>
        </div>
      </div>

      <div className="counsellor-sidebar-menu">
        <div className="menu-section">
          <div className="menu-section-title">Main</div>
          <button
            className={`counsellor-sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => onTabChange("dashboard")}
          >
            <RiDashboardLine /> Dashboard
          </button>
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Scheduling</div>
          <button
            className={`counsellor-sidebar-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => onTabChange("bookings")}
          >
            <FaPhone /> Booking Calls
          </button>

          <button
            className={`counsellor-sidebar-item ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => onTabChange("calendar")}
          >
            <RiCalendarCheckLine /> Calendar
          </button>

          <button
            className={`counsellor-sidebar-item ${activeTab === "appointments" ? "active" : ""}`}
            onClick={() => onTabChange("appointments")}
          >
            <RiCalendarLine /> Appointments
          </button>
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Communication</div>
          <button
            className={`counsellor-sidebar-item ${activeTab === "priority-dm" ? "active" : ""}`}
            onClick={() => onTabChange("priority-dm")}
          >
            <RiMessageLine /> Priority DM
          </button>

          <button
            className={`counsellor-sidebar-item ${activeTab === "testimonials" ? "active" : ""}`}
            onClick={() => onTabChange("testimonials")}
          >
            <FaStar /> Testimonials
          </button>
        </div>

        <div className="menu-section">
          <div className="menu-section-title">Resources</div>
          <button
            className={`counsellor-sidebar-item ${activeTab === "resources" ? "active" : ""}`}
            onClick={() => onTabChange("resources")}
          >
            <RiBookLine /> Resources
          </button>

          <button
            className={`counsellor-sidebar-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => onTabChange("profile")}
          >
            <RiUserSettingsLine /> Profile
          </button>
        </div>
      </div>

      <div className="counsellor-sidebar-footer">
        <button className="counsellor-logout-button" onClick={onSignOut}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default CounsellorSidebar;
