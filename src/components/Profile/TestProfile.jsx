import React from "react";
import { Link } from "react-router-dom";

import Footer from "../Footer/Footer";

const TestProfile = () => {
  return (
    <>
      <div style={{
        padding: "50px",
        textAlign: "center",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.6rem"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Profile Page Test</h1>
        <p>This is a simple test page to verify routing is working correctly.</p>
        <div style={{ marginTop: "30px" }}>
          <Link to="/" style={{
            padding: "10px 20px",
            backgroundColor: "#12229d",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            fontSize: "1.6rem"
          }}>
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TestProfile;
