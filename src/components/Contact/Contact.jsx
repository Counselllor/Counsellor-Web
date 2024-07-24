import { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import Modal from "react-modal";
import { ThemeContext } from "../../App";
import { getDatabase, ref, push, set } from "firebase/database";

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const name = useRef();
  const lastname = useRef();
  const feedback = useRef();
  const email = useRef();
  const navigate = useNavigate();

  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("login")) {
      setLogin(true);
    }
  }, [navigate]);

  const form = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {
      name: form.current.firstname.value + " " + form.current.lastname.value,
      email: form.current.email.value,
      feedback: form.current.feedback.value,
      created_date: new Date().toISOString(),
    };

    emailjs.send("service_kszura2", "template_u8shl9d", params, {
      publicKey: "rSYpY_RsF76o4MgcA",
    });

    const db = getDatabase();
    const queriesRef = ref(db, "queries");
    const newQueryRef = push(queriesRef);
    set(newQueryRef, params)
      .then(() => {
        setIsModalOpen(true);
        form.current.reset();
      })
      .catch((error) => {
        console.error("Error submitting query: ", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Navbar />
      <div className="contact1">
        <ToastContainer />
        <div className="right">
          <form className="form" ref={form} onSubmit={handleSubmit}>
            <h1>Get In Touch</h1>
            <p>You can reach us any time</p>
            <div className="name-inputs">
              <input
                ref={name}
                className="name"
                name="firstname"
                placeholder="First Name"
                required
              />
              <input
                className="name"
                ref={lastname}
                name="lastname"
                placeholder="Last name"
              />
            </div>
            <div>
              <input
                ref={email}
                name="email"
                placeholder="Your Email"
                type="email"
                required
              />
            </div>
            <div>
              <textarea
                ref={feedback}
                name="feedback"
                placeholder="How can I help you?"
                required
              />
            </div>
            <button type="submit">Submit</button>
            <p className="terms">
              By contacting us you agree to our <b>Terms of Service</b> and{" "}
              <b>Privacy Policy</b>.
            </p>
          </form>
        </div>
        <div className="left">
          <h1>Contact Us</h1>
          <p className="contact-text">
            Email, call, or complete the form to learn how Counsellor can solve
            your problem
          </p>
          <div className="counmail">
          <span>Counsellor@gmail.com</span>
          <span>xxxxx-xxxxx</span>
          </div>
          <div className="customer">
            <div className="left1">
              <h1>Customer Support</h1>
              <p>
                Our Support Team is available around the clock to address any
                concerns or queries.
              </p>
            </div>
            <div className="left1">
              <h1>Feedback and Suggestions</h1>
              <p>
                We value your feedback and are continuously working to improve.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />


      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Submission Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Thank you!</h2>
        <p>Thank you for contacting us. We will get back to you soon.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </main>
  );
};

export default Contact;
