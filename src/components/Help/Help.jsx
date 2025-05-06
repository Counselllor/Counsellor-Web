import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import "./Help.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { auth } from "../../firebase/auth";
import { Switch } from 'antd';
import { ThemeContext } from "../../App";
import { signOut} from "firebase/auth";
import { toast } from "react-toastify";
import ConditionalNavbar from "../Navbar/ConditionalNavbar";


const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
    </nav>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span className="faq-icon">{isOpen ? "−" : "+"}</span>
        {question}
      </div>
      <div
        ref={contentRef}
        className="faq-answer"
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px"
        }}
      >
        {answer}
      </div>
    </div>
  );
};

const Help = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();


  let [isLoggedIn,setLogin]=useState(false)
  useEffect(() => {
    if(localStorage.getItem('login')){

      setLogin(true)
    }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // handle user logged in state
    //   } else {

    //   }
    // });
  }, [navigate]);
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "What is Counsellor Social?",
      answer:
        "Counsellor Social is a platform designed to connect individuals with professional counselors, offering a variety of other technical services also.",
    },
    {
      question: "How do I register?",
      answer:
        "Click on Sign Up, fill in your details, and verify your email to create an account.",
    },
    {
      question: "Do you offer career advancement support?",
      answer:
        "Yes, we help you develop strategies for climbing the corporate ladder and achieving your long-term career goals.",
    },
    {
      question: "Can you help me with my resume?",
      answer:
        "Yes, we assist in crafting compelling resumes that highlight your strengths.",
    },
    {
      question: "What job placement services do you offer?",
      answer:
        "We connect you with top employers in your field through our extensive network of industry partners.",
    },
    {
      question: "Where can I contact for my doubts?",
      answer:
        "There is a contact section. Go there, fill the form, and ask your doubts.",
    },
    {
      question: "Is the college data provided here correct?",
      answer: "Yes, this is the latest data as per 2023.",
    },
    {
      question: "Can I contribute to this page?",
      answer: (
        <>
          Yes, of course! Here is the repository{" "}
          <a
            href="https://github.com/Counselllor/Counsellor-Web"
            className="repo-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            link
          </a>
          .
          <br />
          But make sure to follow our contribution rules and regulations before
          making any contribution.
        </>
      ),
    },
  ];
  return (
    <main id={theme}>
      <ConditionalNavbar />
      <div className="help-header">
        <div className="help-header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary__main">HELP & SUPPORT</span>
            <span className="heading-primary__sub">Find the answers you need</span>
          </h1>
        </div>
      </div>
      <div className="help-content">

          <section id="getting-started">
            <h2>Getting Started</h2>
            <p>
              Welcome to our help page. Here you will find all the necessary information to get started with our services.
            </p>
            <ul>
              <li>Sign up for an account by clicking the 'Sign Up' button on the top right corner.</li>
              <li>Verify your email address by clicking on the link sent to your email.</li>
              <li>Log in to your account and complete your profile setup.</li>
            </ul>
          </section>

          <section id="positionsnew">
            <h2>Open Positions</h2>
            <p>
              We are always looking for talented individuals to join our team.
              Check out our <Link to="/careers" className="help-link">careers page</Link> for
              current openings.
            </p>
          </section>

      <div id="faqsh" className="faqs-containerh">
      <h2>Frequently Asked Questions</h2>
      <div className="accordionh">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-itemh">
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index ? "true" : "false"}
            >
              <span className="accordion-title">{faq.question}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div
              className={`accordion-contenth ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      </div>

          {/* <section id="contact-support">
            <h2>Contact Support</h2>
            <p>
              If you need further assistance, please do not hesitate to contact our support team. We are here to help you.
            </p>
            <ul>
              <li>Email us at: support@example.com</li>
              <li>Call us: 1-800-123-4567</li>
              <li>Live chat available 24/7 on our website</li>
            </ul>
          </section>

          <section id="account-management">
            <h2>Account Management</h2>
            <p>
              Learn how to manage your account settings, update your information, and more.
            </p>
            <ul>
              <li>Update your personal information in the 'Profile' section.</li>
              <li>Change your password under 'Security Settings'.</li>
              <li>Manage your subscriptions and notifications in the 'Preferences' section.</li>
            </ul>
          </section> */}

          {/* <section id="billing-payments">
            <h2>Billing and Payments</h2>
            <p>
              Find information on how to handle your billing and payments, including how to update your payment methods and view your billing history.
            </p>
            <ul>
              <li>View your billing history in the 'Billing' section of your account.</li>
              <li>Update your payment methods under 'Payment Settings'.</li>
              <li>Contact billing support for any discrepancies or issues.</li>
            </ul>
          </section> */}

          {/* <section id="security">
            <h2>Security</h2>
            <p>
              Your security is our priority. Learn about the measures we take to protect your data and how you can secure your account.
            </p>
            <ul>
              <li>Enable two-factor authentication for added security.</li>
              <li>Regularly update your password and avoid using the same password across multiple sites.</li>
              <li>Be aware of phishing scams and do not share your personal information.</li>
            </ul>
          </section> */}

          {/* <section id="troubleshooting">
            <h2>Troubleshooting</h2>
            <p>
              Encountering issues? Check our troubleshooting section for guidance on how to resolve common problems.
            </p>
            <ul>
              <li><strong>App not loading:</strong> Try clearing your browser cache or reinstalling the app.</li>
              <li><strong>Payment issues:</strong> Ensure your payment information is correct and up-to-date.</li>
              <li><strong>Account locked:</strong> Contact support to regain access to your account.</li>
            </ul>
          </section> */}


          {/* <section id="feedback">
            <h2>Feedback</h2>
            <p>
              We value your feedback. Please let us know how we can improve our services.
            </p>
            <ul>
              <li>Submit your feedback through our online form.</li>
              <li>Join our user community and participate in discussions.</li>
              <li>Follow us on social media for the latest updates and news.</li>
            </ul>
          </section> */}
      </div>
      <Footer />
    </main>
  );
};
export default Help;
