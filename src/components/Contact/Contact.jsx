import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/auth";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { FaPhone } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

const Contact = () => {
  const navigate = useNavigate();
  let form = useRef();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    let params = {
      name: form.current.name.value,
      email: form.current.email.value,
      feedback: form.current.feedback.value,
    };
    emailjs.send("service_kszura2", "template_u8shl9d", params, {
      publicKey: "rSYpY_RsF76o4MgcA",
    });
  }

  return (
    <main>
      <Navbar />
      <section className="contact-section">
        <h2>Let&apos;s Get in Touch</h2>
        <p className="pline">
          Fill out the form below and we&apos;ll get back to you as soon as
          possible.
        </p>
        <div className="contactbox">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="namefield">Name </label>
              <input
                id="namefield"
                type="text"
                required
                className="name-input"
                placeholder="Enter your name"
                name="name"
              />
            </div>

            <div className="contact-field">
              <label htmlFor="emailfield"> Email </label>
              <input
                id="emailfield"
                placeholder="Enter your email"
                type="email"
                className="name-input"
                name="email"
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="message">Message </label>
              <textarea
                className="message-input"
                id="message"
                placeholder="Enter your message"
                name="message"
              />
            </div>
            <button className="submit-btn" type="submit">
              Send
              <LuSend className="send-icon" />
            </button>
          </form>
          <div>
            <h3 className="connect-text">Connect with Us</h3>
            <div className="connect1">
              <Link className="connect-link" to="#">
                <MdEmail className="connect-icon" />
              </Link>
              <div className="connect-line">
                <p>Email to us at </p>
                <p>abc@gmail.com</p>
              </div>
            </div>

            <div className="connect1">
              <Link className="connect-link" to="#">
                <FaPhone className="connect-icon" />
              </Link>
              <div className="connect-line">
                <p>Call us at </p>
                <p>XXXXX XXXXX</p>
              </div>
            </div>

            <div className="connect1">
              <Link className="location-connect-link" to="#">
                <IoLocationOutline className="connect-icon" />
              </Link>
              <div className="connect-line">
                <p>Location at </p>
                <p>XXXXX XXXXX</p>
              </div>
            </div>

            <div className="social-links">
              <Link className="link1" to="#">
                <FaTwitter className="linkicon" />
              </Link>
              <Link className="link1" to="#">
                <FaFacebook className="linkicon" />
              </Link>
              <Link className="link1" to="#">
                <FaLinkedin className="linkicon" />
              </Link>
              <Link className="link1" to="#">
                <FaGithub className="linkicon" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;
