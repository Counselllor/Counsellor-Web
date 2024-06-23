import React from "react";
import "./Privacy.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-item">
        Home
      </Link>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-item active">Privacy Policy</span>
    </nav>
  );
};

const Privacy = () => {
  return (
    <div>
      <div className="privacy-policy-container">
        <Breadcrumb />
        <div className="privacy-policy-content">
          <h1>Privacy Policy</h1>
          <p className="date">
            Last updated: <span style={{ color: "blue" }}>29/05/2024</span>
          </p>
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use, and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </p>
          <h2 className="title">Interpretation and Definitions</h2>
          <h3 className="sub-title">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <h3 className="sub-title">Definitions</h3>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li>
              <strong>Account</strong> means a unique account created for You to
              access our Service or parts of our Service.
            </li>
            <li>
              <strong>Company</strong> (referred to as either "the Company",
              "We", "Us" or "Our" in this Agreement) refers to [College Name],
              [College Address].
            </li>
            <li>
              <strong>Cookies</strong> are small files that are placed on Your
              computer, mobile device, or any other device by a website,
              containing the details of Your browsing history on that website
              among its many uses.
            </li>
            <li>
              <strong>Country</strong> refers to: [Country]
            </li>
            <li>
              <strong>Device</strong> means any device that can access the
              Service such as a computer, a cellphone, or a digital tablet.
            </li>
            <li>
              <strong>Personal Data</strong> is any information that relates to
              an identified or identifiable individual.
            </li>
          </ul>
          <h2 className="title">Collecting and Using Your Personal Data</h2>
          <h3 className="sub-title">Types of Data Collected</h3>
          <h4 className="sub-title">Personal Data</h4>
          <p>
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Usage Data</li>
          </ul>
          <h4 className="sub-title">Usage Data</h4>
          <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ullam consequatur rem ipsa maiores recusandae libero illo repellendus, excepturi necessitatibus?
          </p>
          <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ullam consequatur rem ipsa maiores recusandae libero illo repellendus, excepturi necessitatibus?
          </p>
          <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ullam consequatur rem ipsa maiores recusandae libero illo repellendus, excepturi necessitatibus?
          </p>
          <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ullam consequatur rem ipsa maiores recusandae libero illo repellendus, excepturi necessitatibus?
          </p>
          <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt ullam consequatur rem ipsa maiores recusandae libero illo repellendus, excepturi necessitatibus?
          </p>
        </div>
      </div>

      <hr />

      <Footer />
    </div>
  );
};

export default Privacy;
