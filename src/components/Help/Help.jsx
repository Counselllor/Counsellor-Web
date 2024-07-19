import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import "./Help.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import BackToHomeButton from "../backtohome";
import Logo from "../../assets/logo.webp";
import { auth } from "../../firebase/auth";
import { Switch } from 'antd';
import { ThemeContext } from "../../App";
import { signOut} from "firebase/auth";
import { toast } from "react-toastify";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
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
    <>
      <nav className={"navbar fixed"}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li><a href="/topuniversities">Top Universities</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="./courses">Courses</a></li>
            <li><a href="/careersupport">Career Support</a></li>
            {!isLoggedIn&&  <li><a href="/" onClick={handleSignOut}>Login</a></li>}
          {
isLoggedIn&&<>

           <li><a href="/" onClick={handleSignOut}>Log Out</a></li>
            <li><button className='profile_btn'>Profile</button></li>
         
            <li>
              <Switch
                style={{ backgroundColor: theme === "dark" ? "#000000" : "" }}
                onChange={handleThemeChange}
                checked={theme === "dark"}
                checkedChildren="Dark Mode"
                unCheckedChildren="Light Mode"
              />
            </li> </>} 
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>
      </nav>      <BackToHomeButton />

      <div className="help-container">
        <Breadcrumb />

        <div className="contents">
          <h1>Help & Support</h1>

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
      </div>
    
      <div style={{
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '0 20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>

        <Box
        i="fas fa-phone"
          heading="Contact Support"
          text="If you need further assistance, please do not hesitate to contact our support team. We are here to help you."
          contactInfo={[
            { type: 'text2', value: 'Email us at: support@example.com' },
            { type: 'phone', value: 'Call us: 1-800-123-4567' },
            { type: 'text', value: 'Live chat available 24/7 on our website' }
          ]}
        />
        <Box
        i="fas fa-user"
          heading="Account Management"
          text="Learn how to manage your account settings, update your information, and more."
          contactInfo={[
            { type: 'text2', value: 'Update your personal information in the "Profile" section.' },
            { type: 'phone', value: 'Change your password under "Security Settings".' },
            { type: 'text', value: 'Manage your subscriptions and notifications in the "Preferences" section.' }
          ]}
        />
        <Box
        i="fas fa-file-invoice-dollar"
          heading="Billing and Payments"
          text="Find information on how to handle your billing and payments, including how to update your payment methods and view your billing history."
          contactInfo={[
            { type: 'text2', value: 'View your billing history in the "Billing" section of your account.' },
            { type: 'phone', value: 'Update your payment methods under "Payment Settings".' },
            { type: 'text', value: 'Contact billing support for any discrepancies or issues.' }
          ]}
        />
            <Box
                    i="fas fa-lock"
          heading="Security"
          text="Your security is our priority. Learn about the measures we take to protect your data and how you can secure your account."
          contactInfo={[
            { type: 'text2', value: 'Enable two-factor authentication for added security.' },
            { type: 'phone', value: 'Regularly update your password and avoid using the same password across multiple sites.' },
            { type: 'text', value: 'Be aware of phishing scams and do not share your personal information.' }
          ]}
        />
            <Box
            i="fas fa-wrench"
            iconClass="fa-solid fa-phone" 
          heading="Troubleshooting"
          text="Encountering issues? Check our troubleshooting section for guidance on how to resolve common problems."
          contactInfo={[
            { type: 'text2', value: 'App not loading: Try clearing your browser cache or reinstalling the app.' },
            { type: 'phone', value: 'Payment issues: Ensure your payment information is correct and up-to-date.' },
            { type: 'text', value: 'Account locked: Contact support to regain access to your account.' }
          ]}
        />
            <Box
            i="fas fa-comments"
          heading="Feedback"
          text="We value your feedback. Please let us know how we can improve our services."
          contactInfo={[
            { type: 'text2', value: 'Submit your feedback through our online form.' },
            { type: 'phone', value: 'Join our user community and participate in discussions.' },
            { type: 'text', value: 'Follow us on social media for the latest updates and news.' }
          ]}
        />
      </div>
    </div>

      <hr />

      <Footer />
    </>
  );
};
function Box({ i,heading, text, contactInfo }) {
  return (
    <div style={{
      width: '450px',
      margin: '10px',
      float: 'left',
      border: '1px solid #0000FF',
      padding: '20px'
    }}>
           <i className={i} style={{
        fontSize: '50px',
        color: '#0000FF',
        marginRight: '10px'
      }} />

     <p style={{
        fontSize: '30px',
        marginTop:'7px',
        marginBottom:'7px',
        color: '#0000FF',
        fontWeight: 'bold'
      }}>
        {heading}
      </p>
      <p style={{
        fontSize: '15px',
        margin:'10px',
        color: '#666',
      }}>
        {text}
      </p>
      <ul style={{ listStyle: 'disc', padding: 0, margin: 0,marginTop:'25px' }}>
  {contactInfo.map((item, index) => (
    <li key={index} style={{ textAlign: 'left', fontSize: '15px',marginLeft:'15px' }}>
      {item.value}
    </li>
  ))}
</ul>
    </div>
  );
}
export default Help;
