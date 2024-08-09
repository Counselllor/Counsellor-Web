import React, { useState } from "react";
import Modal from "react-modal";
import "./FAQs.css";
import { database } from "../../firebase/auth"; // Adjust the path according to your project structure
import { ref, set } from "firebase/database";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const faqs = [
    {
      question: "1. Where can I contact for my doubts?",
      answer:
        "There is a contact section. Go there, fill the form, and ask your doubts.",
    },
    {
      question: "2. Is the college data provided here correct?",
      answer: "Yes, this is the latest data as per 2023.",
    },
    {
      question: "3. Can I contribute to this page?",
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

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    emailInput.value = "";

    // Save email to Firebase Realtime Database
    try {
      const emailKey = email.replace(/[.#$/[\]]/g, "_"); // Replace invalid characters for Firebase keys
      const emailRef = ref(database, `newsletter/emails/${emailKey}`);
      await set(emailRef, { email });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error saving email to database:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="faqs" className="faqs-container">
      <h2>Frequently Asked Questions</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-item">
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index ? "true" : "false"}
            >
              <span className="accordion-title">{faq.question}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div
              className={`accordion-content ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <section className="newsletter-section">
        <h2>Stay updated with our latest news!</h2>
        <p>
          Subscribe to our newsletter to receive exclusive updates, promotions,
          and more.
        </p>
        <form id="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
          />
          <button id="subscribe-btn" type="submit">
            Subscribe
          </button>
        </form>
      </section>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Subscription Confirmation"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Thank you!</h2>
        <p>
          Thank you for subscribing to our newsletter. <br />
          Stay tuned to hear about our new updates.
        </p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default FAQs;
