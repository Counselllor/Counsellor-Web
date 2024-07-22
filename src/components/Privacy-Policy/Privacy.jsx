import React, { useState, useEffect } from "react";
import "./Privacy.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import img from "./img.png"

const Breadcrumb = () => {
  return (
    <nav className="breadcrumb">
    </nav>
  );
};

const Privacy = () => {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
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
    const interval = setInterval(updateDate, 7 * 24 * 60 * 60 * 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
    <div className="main">      <Navbar/>


      <div className="privacy-policy-container">
        <Breadcrumb />
        <div className="privacy-policy-sidebar" style={{
    }} >
    <h2 style={{ textAlign: 'center',fontSize:'2.5rem' }}>Table of Contents</h2>
    <ul style={
      {
       padding:'25px' 
      }
    } >
    <li style={{ textAlign:'center',fontSize:'1.5rem' }}><a href="#interpretation-and-definitions">Interpretation</a></li>
    <li style={{ textAlign:'center',fontSize:'1.5rem' }}><a href="#collecting-and-using-your-personal-data">Information Collected</a>    </li>
    <li style={{ textAlign:'center',fontSize:'1.5rem' }}><a href="#cookies">Cookies and Others</a>    </li>
    <li style={{ textAlign:'center',fontSize:'1.5rem' }}><a href="#disclaimer">Disclaimer</a></li>
    <li style={{ textAlign:'center',fontSize:'1.5rem' }}><a href="#contact_us">Contact Us</a></li>
</ul>
  </div>

  <div className="privacy-policy-content" style={{
          
        }} >
          <h1 style={{
            fontSize:'40px'
          }} >Privacy Policy</h1>
          <p className="date">
            Last updated:<span style={{ color: "blue" }}>22/07/2024</span>
          </p>
          <p>
            This Privacy Policy describes Our policies and procedures on the
            collection, use, and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.</p>
            <p>
            At Counsellor Portal, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal data.
In addition to this Privacy Policy, we provide data and privacy information embedded in our services and certain features that ask to use your personal data.
            {/* Last updated: <span style={{ color: "blue" }}>{lastUpdatedDate}</span> */}
          </p>
          <p>
            This Privacy Policy describes our policies and procedures on the
            collection, use, and disclosure of your information when you use the
            service and tells you about your privacy rights and how the law
            protects you.
          </p>
      <img src={img} alt="" style={{
       display: 'block',
       margin: '0 auto'
      }} />
          <p>In addition to this Privacy Policy, we offer in-product guidance on data and privacy practices. Certain features that request access to your personal data are accompanied by our Data & Privacy Icon, providing you with transparent and contextual information about how your data will be used.</p>
          <p>
          You can familiarize yourself with our privacy practices, accessible via the headings below, and <a href="/contact">contact us</a> if you have any questions.</p>
          <a href="/src/components/Privacy-Policy/Privacy Policy.pdf" download="PrivacyPolicy.pdf" style={{
            fontSize:'20px',textAlign:'center',margin:'20px auto',display:'block'
          }} >Download Privacy Policy PDF</a>

          <h2 className="title" id="interpretation-and-definitions"  >Interpretation and Definitions</h2>
          <h3 className="sub-title">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>
          <h3 className="sub-title">Definitions</h3>
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
         
          <h2 className="title" id="collecting-and-using-your-personal-data" style={{
            marginBottom:'30px'
          }} >Information Collected</h2>

          <h3 className="sub-title">Types of Data Collected</h3>
          <h4 className="sub-title">Personal Data</h4>
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
          <h4 className="sub-title">Information Collection and Use</h4>
         <ul className="information">
            <li>Usage Data: Information about how you use our website and services, including IP addresses, browser types, and browsing activities.            </li>
<li>Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your experience on our website.</li>
            <li>          Personal Information: Information you provide when creating an account, such as your name, email address, and contact details.
            </li>
          </ul>
          <h4 className="sub-title">Data Sharing and Disclosure</h4>
   <ul className="data">
    <li>Service Providers: Third-party companies that perform services on our behalf, such as hosting, data analysis, and customer service.</li>
    <li>Legal Obligations: When required by law or to protect our rights and interests.</li>
    <li>Business Transfers: In connection with a merger, sale, or reorganization of our business.</li>
    </ul>       
    <h2 className="title" id="cookies" style={{
            marginBottom:'30px'
          }} >Cookies and Others</h2>
<p>Do you share my personal data with third parties? <br />We may share your personal data with third parties, such as job boards, career resources, or educational institutions, but only with your consent and as per our privacy policy. </p>
  <h4 className="sub-title">
  How Information Is Used
  </h4>
  <p  >At Counselor Portal, we are committed to safeguarding your personal information. We collect and use personal information only for lawful purposes connected with our services. The information we collect is essential for the following purposes: </p>
 <ul>
  <li>Authentication
We use your personal information to authenticate your identity. This helps us ensure that you can easily access and use the services provided by Counselor Portal and our affiliated partners.</li>


<li>Candidate Engagement Tracking
We track your engagement to better understand how you interact with our services. This helps us improve our offerings and provide you with a more personalized experience.
</li>
<li>Service Provision
Your information allows us to provide you with the services you explicitly request. It also helps us resolve any disputes or troubleshoot concerns you may have.
</li>

<li>Informational Updates
We use your information to keep you informed about relevant processes, including admissions, vocational training programs, and scholarships.</li>
</ul>
<h2 className="title" id="protectingminordata"  >Protecting Minors' Personal Data</h2>
<p>At the Career Counselor Portal, we recognize the importance of safeguarding the personal data of minors, which we consider to be individuals under the age of 13 or the equivalent age as specified by law in your jurisdiction. To ensure the protection of minors' personal data, we have implemented additional processes and protections.</p>
   <ul> <li>Creating a Minor's Account : To access certain features on the Career Counselor Portal, a minor must have a minor account. A minor account may be created by the parent or, in the case of a student account, by the minor's educational institution.</li>    
    <li>Parental Consent : To create a minor account, parents must review the Minor Privacy Disclosure, which describes how the Career Counselor Portal handles minors' personal data. If they agree, the parent must provide the Career Counselor Portal with a verifiable parental consent.</li>    
      <li>Educational Institutions : Educational institutions that participate in the Career Counselor Portal's programs may also create accounts for students. These schools are required to agree to the Managed Accounts for Students Disclosure, which is included as part of the Career Counselor Portal's agreement with the institution.</li>  
      </ul>
<h2 className="title" id="disclaimer"  >Disclaimer</h2>
<p>The Career Counselor Portal's website is intended for informational purposes only, and all content, data, and images are the sole property of the portal. Users are not permitted to copy, reproduce, or distribute any part of the platform or its content without the portal's express written consent. Failure to comply may result in legal action.

While the portal strives to provide accurate and up-to-date information, users are advised to verify the accuracy of the information with the portal's office if they have any doubts. The portal is not liable for any damages or losses resulting from the use of the website, including indirect, incidental, special, consequential, or punitive damages.

The portal is not responsible for any conduct or content of third-party users, including defamatory, offensive, or illegal conduct. Additionally, the portal is not liable for any unauthorized access, use, or alteration of user content or information.

The portal makes every effort to keep the website running smoothly, but it is not responsible for any technical issues that may cause the website to be temporarily unavailable. The portal may also suspend or restrict access to the website at any time without prior notice to perform repairs, maintenance, or introduce new facilities or services.

The portal provides links to external websites of colleges, scholarships, and entrance exam providers, but it is not responsible for the content or accuracy of the information provided by these affiliates. Users should verify the information on their own and not solely rely on the portal for career guidance.

Any career decisions made by users are voluntary and at their sole discretion. The portal holds no responsibility for any career decisions made based on the information obtained from the platform. Users acknowledge and agree that the disclaimers and limitations of liability set forth in this document reflect a reasonable and fair allocation of risk between the user and the portal.</p>
   

    

     


          <h3 className="sub-title">Usage of Your Personal Data</h3>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul className="usage-data">
            <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
            <li><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
            <li><strong>For the performance of a contract:</strong> the development, compliance, and undertaking of the purchase contract for the products, items, or services You have purchased or of any other contract with Us through the Service.</li>
            <li><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products, or contracted services, including security updates, when necessary or reasonable for their implementation.</li>
            <li><strong>To provide You</strong> with news, special offers </li>
           </ul>

           <h2 className="title" id="contact_us">Contact Us</h2>
          <p>If you have any questions or concerns regarding the above statement,
please contact:</p>
<ul>
  <li>Email : <a href="mailto:counsellorweb@support.com">counsellorweb@support.com</a></li>
  <li>Phone no : 908XXXXXXX</li>
  <li>Address : Abc......</li>
</ul>
   <p>Alternatively, you can use the contact form available on our website. 👉 <a href="/contact">contact us</a> </p>
   


   </div>

      </div>
      </div>


          <Footer />
          </>
  );
};

export default Privacy;
