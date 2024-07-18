import "./Terms.css";
import Footer from "../Footer/Footer";
import Logo from "../../assets/logo.webp";
import { auth } from "../../firebase/auth";
import { Switch } from 'antd';
import { signOut } from "firebase/auth";
import { ThemeContext } from "../../App";

import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleThemeChange = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true);
    }
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('login');
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const setFixed = useCallback(() => {
    if (window.scrollY > 0) {
      setFix(true);
    } else {
      setFix(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, [setFixed]);

// Dynamic date function update by weekly
  const getLastUpdatedDate = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); 
    const daysSinceLastUpdate = dayOfWeek; 
    const lastUpdatedDate = new Date(currentDate);
    lastUpdatedDate.setDate(currentDate.getDate() - daysSinceLastUpdate);
    return lastUpdatedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const lastUpdatedDate = getLastUpdatedDate();

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
            {!isLoggedIn && <li><a href="/" onClick={handleSignOut}>Login</a></li>}
            {isLoggedIn && <>
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
              </li>
            </>}
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
          <div className={`bar ${menuOpen ? 'open' : ''}`} />
        </div>
      </nav>
      <div className="terms-container">
        <div className="contents">
          <h1>Terms & Conditions</h1>
          <p>Last updated: {lastUpdatedDate}</p>
          <section>
            <h2>Eligibility</h2>
            <p>
              By using our services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these terms. If you are using our services on behalf of an organization, you represent and warrant that you have the authority to bind the organization to these terms.
            </p>
          </section>
          <section>
            <h2>Intellectual Property</h2>
            <p>
              Unless otherwise stated, Counsellor and/or its licensors own the intellectual property rights for all material on Counsellor. All intellectual property rights are reserved. You may access this from Counsellor for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from Counsellor</li>
              <li>Sell, rent, or sub-license material from Counsellor</li>
              <li>Reproduce, duplicate, or copy material from Counsellor</li>
              <li>Redistribute content from Counsellor</li>
            </ul>
          </section>
          <section>
            <h2>User Accounts</h2>
            <p>
              When you create an account with us, you must provide us with accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </section>
          <section>
            <h2>Prohibited Activities</h2>
            <p>
              You may not access or use the site for any purpose other than that for which we make the site and our services available. The site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. Prohibited activities include, but are not limited to:
            </p>
            <ul>
              <li>Systematically retrieving data or other content from the site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Making any unauthorized use of the site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
              <li>Engaging in unauthorized framing of or linking to the site.</li>
              <li>Tricking, defrauding, or misleading us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Engaging in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
              <li>Using the site to advertise or offer to sell goods and services.</li>
            </ul>
          </section>
          <section>
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Counsellor, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
          </section>
          <section>
            <h2>Governing Law</h2>
            <p>
              These terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights. If any provision of these terms is held to be invalid or unenforceable by a court, the remaining provisions of these terms will remain in effect. These terms constitute the entire agreement between us regarding our service, and supersede and replace any prior agreements we might have had between us regarding the service.
            </p>
          </section>
          <section>
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the terms.
            </p>
            <p>If you wish to terminate your account, you may simply discontinue using the service.</p>
          </section>
          <section>
            <h2>Changes to These Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the service.
            </p>
          </section>
          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these terms, please contact us at <a href="mailto:counsellorweb@support.com">counsellorweb@support.com</a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
