import React from "react";
import "./Help.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-item">
        Home
      </Link>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-item active">Help</span>
    </nav>
  );
};

const Help = () => {
  return (
    <>
      {/* breadcrumb */}
      <div className="help-container">
        <Breadcrumb />

        {/* help page */}
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
              Have questions? We have answers. Check out our FAQ section for solutions to common problems.
            </p>
            <ul>
              <li><strong>How do I reset my password?</strong> Click on 'Forgot Password' on the login page and follow the instructions.</li>
              <li><strong>How can I update my profile information?</strong> Go to your account settings and make the necessary changes.</li>
              <li><strong>Where can I find my order history?</strong> Navigate to the 'Orders' section in your account dashboard.</li>
            </ul>
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
