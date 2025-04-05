import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/auth";
import { signOut } from "firebase/auth";
import { FaUsers, FaBlog, FaUniversity, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import Logo from "../../assets/logo.webp";
import "../../styles/AdminSidebar.css";

const AdminSidebar = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isAdmin");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <img src={Logo} alt="Logo" className="admin-sidebar-logo" />
        <h2>Admin Panel</h2>
      </div>

      <div className="admin-sidebar-menu">
        <button
          className={`admin-sidebar-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => onTabChange("dashboard")}
        >
          <FaTachometerAlt /> Dashboard
        </button>
        
        <button
          className={`admin-sidebar-item ${activeTab === "users" ? "active" : ""}`}
          onClick={() => onTabChange("users")}
        >
          <FaUsers /> Users
        </button>
        
        <button
          className={`admin-sidebar-item ${activeTab === "blogs" ? "active" : ""}`}
          onClick={() => onTabChange("blogs")}
        >
          <FaBlog /> Blogs
        </button>
        
        <button
          className={`admin-sidebar-item ${activeTab === "colleges" ? "active" : ""}`}
          onClick={() => onTabChange("colleges")}
        >
          <FaUniversity /> Colleges
        </button>
      </div>

      <div className="admin-sidebar-footer">
        <button className="admin-logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
