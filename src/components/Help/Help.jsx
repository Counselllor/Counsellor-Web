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
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('islogin')
        navigate("/");

      })
      .catch((err) => {
        alert(err.message);
      });
  };
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
  return (
    <>
      <nav className={`navbar fixed`}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li><a href="/topuniversities">Top Universities</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="./courses">Courses</a></li>
            <li><a href="/careersupport">Career Support</a></li>
            <li className='dot'><a href="error">•</a></li>
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

          <section id="faq">
            <h2>Frequently Asked Questions</h2>
            <p>
              Still Have questions? We have answers. Check out our FAQ section for solutions to common problems.
            </p>
            <div className="faq-list">
              <FAQItem 
                question="How do I register for an account?" 
                answer="Click on the 'Sign Up' button on the top right corner, fill in the required details, and follow the instructions sent to your email for verification." 
              />
              <FAQItem 
                question="How can I connect with a counselor?" 
                answer="Once you are logged in, go to the 'Connect' section and select 'Find a Counselor' to start a session." 
              />
              <FAQItem 
                question="Is my communication with the counselor secure?" 
                answer="Yes, all communications are encrypted to ensure your privacy and security." 
              />
              <FAQItem 
                question="Can I customize my profile?" 
                answer="Yes, you can update your profile information and preferences in the 'Profile' section." 
              />
              <FAQItem 
                question="How do I view my previous chat history?" 
                answer="Navigate to the 'Chat History' section in your account to view past conversations." 
              />
              <FAQItem 
                question="What should I do if I encounter an issue?" 
                answer="Check the troubleshooting section or contact our support team for assistance." 
              />
            </div>
          </section>

          <section id="contact-support">
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
          </section>

          <section id="billing-payments">
            <h2>Billing and Payments</h2>
            <p>
              Find information on how to handle your billing and payments, including how to update your payment methods and view your billing history.
            </p>
            <ul>
              <li>View your billing history in the 'Billing' section of your account.</li>
              <li>Update your payment methods under 'Payment Settings'.</li>
              <li>Contact billing support for any discrepancies or issues.</li>
            </ul>
          </section>

          <section id="security">
            <h2>Security</h2>
            <p>
              Your security is our priority. Learn about the measures we take to protect your data and how you can secure your account.
            </p>
            <ul>
              <li>Enable two-factor authentication for added security.</li>
              <li>Regularly update your password and avoid using the same password across multiple sites.</li>
              <li>Be aware of phishing scams and do not share your personal information.</li>
            </ul>
          </section>

          <section id="troubleshooting">
            <h2>Troubleshooting</h2>
            <p>
              Encountering issues? Check our troubleshooting section for guidance on how to resolve common problems.
            </p>
            <ul>
              <li><strong>App not loading:</strong> Try clearing your browser cache or reinstalling the app.</li>
              <li><strong>Payment issues:</strong> Ensure your payment information is correct and up-to-date.</li>
              <li><strong>Account locked:</strong> Contact support to regain access to your account.</li>
            </ul>
          </section>

         
          <section id="feedback">
            <h2>Feedback</h2>
            <p>
              We value your feedback. Please let us know how we can improve our services.
            </p>
            <ul>
              <li>Submit your feedback through our online form.</li>
              <li>Join our user community and participate in discussions.</li>
              <li>Follow us on social media for the latest updates and news.</li>
            </ul>
          </section>
        </div>
      </div>

      <hr />

      <Footer />
    </>
  );
};

export default Help;
