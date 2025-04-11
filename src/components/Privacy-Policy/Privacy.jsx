import { useState, useEffect, useContext } from "react";
import "./Privacy.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { ThemeContext } from "../../App";

const Privacy = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    // Calculate a consistent last updated date
    const updateDate = () => {
      const currentDate = new Date();
      const dayOfWeek = currentDate.getDay();
      const daysSinceLastUpdate = (dayOfWeek + 1) % 7;
      const lastUpdated = new Date(currentDate);
      lastUpdated.setDate(currentDate.getDate() - daysSinceLastUpdate);
      const formattedDate = lastUpdated.toLocaleDateString("en-GB");
      setLastUpdatedDate(formattedDate);
    };

    updateDate();

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id={theme}>
      <Navbar />
      <div className="privacy-page">
        <div className="privacy-container">
          <h1>Privacy Policy</h1>

          <div className="privacy-intro">
            <p>
              This Privacy Policy describes our policies and procedures on the
              collection, use, and disclosure of your information when you use the
              service and tells you about your privacy rights and how the law
              protects you.
            </p>
            <p className="date">
              Last updated: <span className="update-date">{lastUpdatedDate}</span>
            </p>
          </div>

          <section className="privacy-section">
            <h2>Interpretation and Definitions</h2>
            <div className="section-content">
              <h3>Interpretation</h3>
              <p>
                The words of which the initial letter is capitalized have meanings
                defined under the following conditions. The following definitions
                shall have the same meaning regardless of whether they appear in
                singular or in plural.
              </p>

              <h3>Definitions</h3>
              <p>For the purposes of this Privacy Policy:</p>
              <ul className="definitions-list">
                <li>
                  <strong>Account</strong> means a unique account created for you to
                  access our service or parts of our service.
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
            </div>
          </section>

          <section className="privacy-section">
            <h2>Collecting and Using Your Personal Data</h2>
            <div className="section-content">
              <h3>Types of Data Collected</h3>
              <h4>Personal Data</h4>
              <p>
                While using our service, we may ask you to provide us with certain
                personally identifiable information that can be used to contact or
                identify you. Personally identifiable information may include, but
                is not limited to:
              </p>
              <ul className="personal-data">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
              </ul>

              <h3>Usage of Your Personal Data</h3>
              <p>The Company may use Personal Data for the following purposes:</p>
              <ul className="usage-data">
                <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                <li><strong>For the performance of a contract:</strong> the development, compliance, and undertaking of the purchase contract for the products, items, or services You have purchased or of any other contract with Us through the Service.</li>
                <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products, or contracted services, including security updates, when necessary or reasonable for their implementation.</li>
                <li><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</li>
              </ul>
            </div>
          </section>

          <div className="privacy-highlights">
            <h3>Your Privacy Rights</h3>
            <p>
              You have the right to access, update or delete your personal information at any time.
              You can also request to opt-out of marketing communications or limit the use of your data.
              To exercise these rights, please contact us using the information provided below.
            </p>
          </div>

          <section className="privacy-section">
            <h2>Contact Us</h2>
            <div className="section-content">
              <p>
                If you have any questions or comments about this policy, you may email us at <a href="mailto:counsellorweb@support.com" className="privacy-link">counsellorweb@support.com</a>
              </p>
            </div>
          </section>

          <div className="privacy-footer">
            <p>Last updated: {lastUpdatedDate}</p>
            <p>
              <Link to="/terms" className="privacy-link">Terms & Conditions</Link> |
              <Link to="/help" className="privacy-link">Help Center</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
