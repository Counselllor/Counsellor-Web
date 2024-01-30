import React from 'react';
import './contact.css'; // Import your CSS file
import Footer from '../Footer/Footer';

function ContactUs() {
  return (
    <div style={{backgroundColor:"#CAE7FE",marginTop:"-5vh"}}>
      <section className="sub-header">
        <nav>
          {/* Your navigation content */}
        </nav>
        <h1 style={{fontSize:"35px"}}>Contact Us</h1>
      </section>

      <section className="location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.03900799053!2d72.88118615!3d19.082250749999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1656527018917!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="contact-us">
        <div className="row">
          <div className="contact-col">
            <div>
              <i className="fa-solid fa-house"></i>
              <span>
                <h5>XYZ Road, ABC Building</h5>
                <p>Mumbai, Maharashtra, India</p>
              </span>
            </div>
            <div>
              <i className="fa-solid fa-phone"></i>
              <span>
                <h5>+1 987654321</h5>
                <p>Monday to Saturday, 10AM to 6PM</p>
              </span>
            </div>
            <div>
              <i className="fa-solid fa-envelope"></i>
              <span>
                <h5>info@easytutorials.com</h5>
                <p>Email us your query</p>
              </span>
            </div>
          </div>
          <div className="contact-col" style={{marginLeft:"5vw",marginTop:"-50vh"}}>
            <form action="form-handler.php" method="post">
              <input type="text" name="name" placeholder="Enter your name" required />
              <input type="text" name="email" placeholder="Enter email address" required />
              <input type="text" name="subject" placeholder="Enter your subject" required />
              <textarea rows="8" name="message" placeholder="Message" required></textarea>
              <button type="Submit" className="hero-btn red-btn" style={{padding:"10px",marginBottom:"5vh"}}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="footer" style={{marginTop:"5vh"}}>
        <Footer />
      </section>
    </div>
  );
}

export default ContactUs;
