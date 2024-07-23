import React, { useState, useEffect } from "react";
import "./Privacy.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";


const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
    </nav>
  );
};

const Privacy = () => {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-GB");
      setLastUpdatedDate(formattedDate);
    };

    updateDate();
  }, []);

  return (
    <>
      <div className="main">
        <Navbar />
        <div className="privacy-policy-container">
          <Breadcrumb />
          <h1>Privacy Policy</h1>
          <p className="date">
            Last updated: <span>{lastUpdatedDate}</span>
          </p>

          <h2>Interpretation and Definitions</h2>

          <div className="highlights">
            <h3>Highlights</h3>
            <p>
              We at [Your Company] want you to understand what information we collect, and how we use and share it. That's why we encourage you to read our Privacy Policy. This helps you use [Your Company] Products in the way that's right for you.
            </p>
            <p>
              In the Privacy Policy, we explain how we collect, use, share, retain and transfer information. We also let you know your rights. Each section of the Policy includes helpful examples and simpler language to make our practices easier to understand.
            </p>
            <p>
              Read the full policy below.
            </p>
          </div>

          <h3>Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h3>Definitions</h3>
          <p>For the purposes of this Privacy Policy:</p>
          <ul className="definitions-list">
            <li>
              <strong>Account</strong> means a unique account created for you to access our service or parts of our service.
            </li>
            <li>
              <strong>Company</strong> (referred to as either "the Company",
              "We", "Us" or "Our" in this Agreement) refers to Counsellor,
              [College Address].
            </li>
            <li>
              <strong>Cookies</strong> are small files that are placed on your
              computer, mobile device, or any other device by a website,
              containing the details of your browsing history on that website
              among its many uses.
            </li>
            <li>
              <strong>Country</strong> refers to: [Country]
            </li>
            <li>
              <strong>Device</strong> means any device that can access the
              service such as a computer, a cellphone, or a digital tablet.
            </li>
            <li>
              <strong>Personal Data</strong> is any information that relates to
              an identified or identifiable individual.
              </li>
          </ul>

          <h2>Use of Your Personal Data</h2>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul className="usage-data">
            <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
            <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
            <li><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
            <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, You can contact us:
          </p>
          <ul>
            <li>By email: privacy@yourcompany.com</li>
            <li>By visiting this page on our website: www.yourcompany.com/contact</li>
            <li>By phone number: [Your Phone Number]</li>
            <li>By mail: [Your Postal Address]</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;