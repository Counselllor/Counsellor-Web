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
<Navbar/>
    <BackToHomeButton />
    
      {/* breadcrumb */}
      <div className="terms-container">
      
        
        {/* terms page */}
        <div className="contents">
          <h1>Terms & Conditions</h1>
          <section id="cookies">
            <h2>Cookies</h2>
            <ul>
              <li>We use cookies to enhance user experience.</li>
              <li>Cookies help us understand user preferences.</li>
              <li>By using our site, you consent to the use of cookies.</li>
            </ul>
          </section>
          <section id="license">
            <h2>License</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              eum explicabo quae totam voluptatum. Expedita nisi quo facere odio
              quas obcaecati porro architecto minus, eum sed commodi ratione
              modi deleniti perspiciatis! Labore ipsa sapiente ab minima
              incidunt tempora perferendis iure at et placeat. Praesentium
              temporibus nisi et est eius fugit.
            </p>
            <ul>
              <li>Republish material from CrickClub24</li>
              <li>Sell, rent or sub-license material from CrickClub24</li>
              <li>Reproduce, duplicate or copy material from CrickClub24</li>
              <li>Redistribute content from CrickClub24</li>
            </ul>
          </section>
    
     
         <section id="hyperlinking">
            <h2>Hyperlinking to our Content</h2>
            <p>
              The following organizations may link to our Website without prior
              written approval:
            </p>
            <ul>
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors;</li>
              <li>System wide Accredited Businesses.</li>
            </ul>
          </section> 
        
         <section id="iframes">
            <h2>iFrames</h2>
            <ul>
              <li>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</li>
            </ul>
          </section>

          <section id="liability">
            <h2>Content Liability</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
              itaque iusto sed a consequuntur adipisci corporis quidem est.
              Similique optio esse placeat reiciendis velit nemo rerum corporis
              consectetur, perspiciatis, hic nostrum et illum recusandae ea,
              asperiores ducimus distinctio temporibus nam!
            </p>
          </section>
        </div>
      </div>

      <hr />

      <Footer />
    </>
  );
};

export default Terms;
