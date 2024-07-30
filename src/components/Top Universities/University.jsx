<<<<<<< HEAD
import {useEffect, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> 70f7403d79434b00b7f6bdf7ad022b04f751e71a
import unidata from "./data.json";
import "./university.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { auth } from "../../firebase/auth";
<<<<<<< HEAD

import { useNavigate } from "react-router-dom";


const University = () => {
  
=======
import { useNavigate } from "react-router-dom";

const University = () => {
  const [isModal, setIsModal] = useState(false);
>>>>>>> 70f7403d79434b00b7f6bdf7ad022b04f751e71a
  const navigate = useNavigate();
  const [isLoggedIn, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLogin(true);
      }
    });

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const renderSkeletons = () => {
    return [...Array(unidata.length)].map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-img" />
        <div className="skeleton-title" />
        <div className="skeleton-company" />
        <div className="skeleton-description" />
        <div className="skeleton-location" />
      </div>
    ));
  };

  return (
    <>
      <div className="universityPage">
        <Navbar />
        <header className="universityPage-header">
          <h1 className="universityPage-main-title">Top Universities</h1>
          <p className="universityPage-subtitle">Explore exciting Universities</p>
        </header>
        <section className="universityPage-content" style={{ zIndex: 10 }}>
          <div className="universityPage-list">
            {loading
              ? renderSkeletons()
              : unidata.map((university) => (
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
