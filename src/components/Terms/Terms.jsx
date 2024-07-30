import "./Terms.css";
import Footer from "../Footer/Footer";
import BackToHomeButton from '../backtohome';


import { useCallback,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


const Terms = () => {
 



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
  return (
    <>
      <Navbar />
      {/* Breadcrumb can be added here */}
      <div className="privacy-page">
        <div className="privacy-policy-container">
          <h1>Terms & Conditions</h1>
          
          <section>
            <h2>Cookies</h2>
            <ul>
              <li>We use cookies to enhance user experience.</li>
              <li>Cookies help us understand user preferences.</li>
              <li>By using our site, you consent to the use of cookies.</li>
            </ul>
          </section>
          
          <section>
            <h2>License</h2>
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
          </section>
          
          <section>
            <h2>Hyperlinking to our Content</h2>
            <p>
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors;</li>
              <li>System wide Accredited Businesses.</li>
            </ul>
          </section>
          
          <section>
            <h2>iFrames</h2>
            <ul>
              <li>
                Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
              </li>
            </ul>
          </section>
          
          <section>
            <h2>Content Liability</h2>
            <p>
              While we strive to provide accurate and up-to-date information, Counsellor does not 
              warrant that the content on our website is complete, reliable, or error-free. We are 
              not liable for any inaccuracies, errors, or omissions in the content. Users are 
              responsible for verifying any information before relying on it. The content is provided 
              "as is" without any guarantees or warranties, express or implied.
            </p>
          </section>
          
          <hr />
          
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default Terms;
