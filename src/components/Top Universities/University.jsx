import React, { useCallback, useContext, useEffect, useState } from "react";
import unidata from "./data.json";
import "./university.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { FaTimes } from "react-icons/fa";
import Logo from "../../assets/logo.webp";
import { auth } from "../../firebase/auth";
import { Switch } from "antd";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";
import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaSlack,
  FaDiscord,
} from "react-icons/fa";

const University = () => {
  const [isModal, setIsModal] = useState(false);
  
  const navigate = useNavigate();
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      }
    });
  }, [navigate]);



  return (
    <>
    <div className="universityPage">
     <Navbar/>
      <header className="universityPage-header">
        <h1 className="universityPage-main-title">Top Universities</h1>
        <p className="universityPage-subtitle">Explore exciting Universities</p>
      </header>
      <section className="universityPage-content" style={{ zIndex: 10 }}>
        <div className="universityPage-list">
          {unidata.map((university) => (
            <div key={university.id} className="universityPage-card">
              <img src={university.image} alt={university.name} />
              <h2 className="universityPage-title">{university.name}</h2>
              <h3 className="universityPage-company">
                <a href={`${university.website}`}>{university.website}</a>
              </h3>
              <p
                className="universityPage-description"
                style={{ fontSize: "15px" }}
              >
                <b>Students:</b> {university.students}
              </p>
              <p
                className="universityPage-location"
                style={{ fontSize: "15px" }}
              >
                <b>Location: </b>
                {university.location}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
      <Footer />
      </>
  );
};

export default University;
