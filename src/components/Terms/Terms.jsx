import "./Terms.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";
import { ThemeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const Terms = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('login')){
      setLogin(true);
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <div id={theme}>

      <div className="terms-page">
        <div className="terms-container">
          {/* Breadcrumb navigation */}
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              <FaHome /> Home
            </Link>
            <span className="breadcrumb-separator">
              <FaChevronRight />
            </span>
            <span className="breadcrumb-item active">Terms & Conditions</span>
          </div>

          <h1>Terms & Conditions</h1>

          <div className="terms-intro">
            <p>
              Welcome to Counsellor. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.
            </p>
          </div>

          <section className="terms-section">
            <h2>Cookies</h2>
            <div className="section-content">
              <ul>
                <li>We use cookies to enhance user experience and provide personalized services.</li>
                <li>Cookies help us understand how you interact with our website, allowing us to improve functionality and content.</li>
                <li>By using our site, you consent to the use of cookies in accordance with our Privacy Policy.</li>
                <li>You can manage cookie preferences through your browser settings, but disabling cookies may affect your experience.</li>
              </ul>
            </div>
          </section>

          <section className="terms-section">
            <h2>License</h2>
            <div className="section-content">
              <p>
                By accessing and using Counsellor, you agree to comply with our licensing terms.
                These terms ensure the protection of our intellectual property and maintain the
                integrity of our content. We grant you a limited, non-exclusive, non-transferable
                license to access and use our website for personal, non-commercial purposes.
              </p>
              <p>Unless explicitly stated, you are not permitted to:</p>
              <ul>
                <li>Republish material from Counsellor</li>
                <li>Sell, rent or sub-license material from Counsellor</li>
                <li>Reproduce, duplicate or copy material from Counsellor</li>
                <li>Redistribute content from Counsellor</li>
              </ul>
            </div>
          </section>

          <section className="terms-section">
            <h2>Hyperlinking to our Content</h2>
            <div className="section-content">
              <p>
                The following organizations may link to our Website without prior written approval:
              </p>
              <ul>
                <li>Government agencies</li>
                <li>Search engines</li>
                <li>News organizations</li>
                <li>Online directory distributors</li>
                <li>System wide Accredited Businesses</li>
              </ul>
              <p>
                These organizations may link to our home page, publications, or other website information
                so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
                endorsement, or approval of the linking party and its products and/or services; and (c) fits
                within the context of the linking party's site.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <h2>iFrames</h2>
            <div className="section-content">
              <p>
                Without prior approval and written permission, you may not create frames around our Webpages
                that alter in any way the visual presentation or appearance of our Website.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <h2>Content Liability</h2>
            <div className="section-content">
              <p>
                While we strive to provide accurate and up-to-date information, Counsellor does not
                warrant that the content on our website is complete, reliable, or error-free. We are
                not liable for any inaccuracies, errors, or omissions in the content. Users are
                responsible for verifying any information before relying on it. The content is provided
                "as is" without any guarantees or warranties, express or implied.
              </p>
            </div>
          </section>

          <div className="terms-highlights">
            <h3>Important Notice</h3>
            <p>
              By using Counsellor, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              If you do not agree with any part of these terms, please do not use our website or services.
            </p>
          </div>

          <div className="terms-footer">
            <p>Last updated: June 2023</p>
            <p>
              <Link to="/privacy" className="terms-link">Privacy Policy</Link> |
              <Link to="/help" className="terms-link">Help Center</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default Terms;
