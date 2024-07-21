import React, { useState } from 'react';
import './Privacy.css';
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Privacy = () => {
  const [activeSection, setActiveSection] = useState('interpretation');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="privacy-container">
        <div className="privacy-content">
          <header className="privacy-header">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last updated: 18/07/2024</p>
          </header>
          <main>
            <section id="interpretation" className="policy-section">
              <h2>Interpretation and Definitions</h2>
              <div className="highlights">
                <h3>Highlights</h3>
                <p>We at [Your Company] want you to understand what information we collect, and how we use and share it. That's why we encourage you to read our Privacy Policy. This helps you use [Your Company] Products in the way that's right for you.</p>
                <p>In the Privacy Policy, we explain how we collect, use, share, retain and transfer information. We also let you know your rights. Each section of the Policy includes helpful examples and simpler language to make our practices easier to understand.</p>
                <a href="#">Read the full policy below.</a>
              </div>
              <h3>Interpretation</h3>
              <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
              <h3>Definitions</h3>
              <p>For the purposes of this Privacy Policy:</p>
              <ul>
                <li><span><strong>Account</strong> means a unique account created for you to access our service or parts of our service.</span></li>
                <li><span><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to [Your Company Name].</span></li>
                <li><span><strong>Cookies</strong> are small files that are placed on your computer, mobile device or any other device by a website, containing the details of your browsing history on that website among its many uses.</span></li>
                <li><span><strong>Country</strong> refers to: [Your Country]</span></li>
                <li><span><strong>Device</strong> means any device that can access the service such as a computer, a cellphone or a digital tablet.</span></li>
                <li><span><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</span></li>
              </ul>
            </section>
            
            <section id="collecting" className="policy-section">
              <h2>Collecting and Using Your Data</h2>
              <h3>Types of Data Collected</h3>
              <h4>Personal Data</h4>
              <p>While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:</p>
              <ul>
                <li><span>Email address</span></li>
                <li><span>First name and last name</span></li>
                <li><span>Phone number</span></li>
                <li><span>Address, State, Province, ZIP/Postal code, City</span></li>
              </ul>
            </section>
            
            <section id="use" className="policy-section">
              <h2>Use of Your Personal Data</h2>
              <p>The Company may use Personal Data for the following purposes:</p>
              <ul>
                <li><span><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</span></li>
                <li><span><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</span></li>
                <li><span><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</span></li>
                <li><span><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</span></li>
              </ul>
            </section>
            
            <section id="contact" className="policy-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, You can contact us:</p>
              <ul>
                <li><span>By email: privacy@yourcompany.com</span></li>
                <li><span>By visiting this page on our website: www.yourcompany.com/contact</span></li>
                <li><span>By phone number: [Your Phone Number]</span></li>
                <li><span>By mail: [Your Postal Address]</span></li>
              </ul>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;