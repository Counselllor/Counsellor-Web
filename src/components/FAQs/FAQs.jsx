import React, { useState } from 'react';
import Modal from 'react-modal';
import './FAQs.css';

const FAQs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const faqs = [
    {
      question: '1. Where can I contact for my doubts?',
      answer: 'There is a contact section. Go there, fill the form, and ask your doubts.',
    },
    {
      question: '2. Is the college data provided here correct?',
      answer: 'Yes, this is the latest data as per 2023.',
    },
    {
      question: '3. Can I contribute to this page?',
      answer: (
        <>
          Yes, of course! Here is the repository <a href="https://github.com/Counselllor/Counsellor-Web" className="repo-link" target="_blank" rel="noopener noreferrer"> link</a>.
          <br />But make sure to follow our contribution rules and regulations before making any contribution.
        </>
      ),
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    document.getElementById('email').value = '';
    setIsModalOpen(true);
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
            <div className="faq-question">
              <span className="accordion-title">{faq.question}</span>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <section className="newsletter-section">
        <h2>Stay updated with our latest news!</h2>
        <p>Subscribe to our newsletter to receive exclusive updates, promotions, and more.</p>
        <form id="newsletter-form" onSubmit={handleSubscribe}>
          <input type="email" id="email" placeholder="Enter your email address" required />
          <button id="subscribe-btn" type="submit">Subscribe</button>
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
        <p>Thank you for subscribing to our newsletter. <br />Stay tuned to hear about our new updates.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default FAQs;