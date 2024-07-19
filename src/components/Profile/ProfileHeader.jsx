import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { toast } from "react-toastify";
export default function ProfileHeader({ children }) {
  const navigate = useNavigate();
  const [sidebarClosed, setSidebarClosed] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarClosed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const sideLinks = document.querySelectorAll(
      ".sidebar .side-menu li a:not(.logout)"
    );
    const handleLinkClick = (item) => {
      sideLinks.forEach((i) => i.parentElement.classList.remove("active"));
      item.parentElement.classList.add("active");
    };

    sideLinks.forEach((item) => {
      item.addEventListener("click", () => handleLinkClick(item));
    });

    return () => {
      sideLinks.forEach((item) => {
        item.removeEventListener("click", () => handleLinkClick(item));
      });
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };

  const handleSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("login");
        navigate("/");
      })
      .catch((err) => {
       toast.error(err.message, {
          className: "toast-message",
        });
      });
  }, [navigate]);

  return (
    <>
      <div className={`sidebar ${sidebarClosed ? "close" : ""}`}>
        <Link to="/" className="logo">
          {/* <img src={Logo} alt="logo" className="logo-img" /> */}
          <i class="bx bxs-comment-dots"></i>
          <div className="logo-name">
            <span>Coun</span>Sellor
          </div>
        </Link>
        <ul className="side-menu">
          <li>
            <Link to="#" className="active">
              <i className="bx bxs-dashboard"></i>Dashboard
            </Link>
          </li>

          <li>
            <Link to="#">
              <i className="bx bx-cog"></i>Settings
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li onClick={handleSignOut}>
            <Link to="#" className="logout">
              <i className="bx bx-log-out-circle"></i>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <nav>
          <div>
            <i className="bx bx-menu" onClick={toggleSidebar}></i>
          </div>
          <Link to="/">
            <div className="logoName">
              <span>Coun</span>Sellor
            </div>
          </Link>
          <div>
            <Link to="#" className="notif">
              <i className="bx bx-bell"></i>
              <span className="count">12</span>
            </Link>
            <Link to="#" className="profile">
              <i class="bx bxs-user-circle img"></i>
            </Link>
          </div>
        </nav>

        <main>{children}</main>
      </div>
    </>
  );
}
