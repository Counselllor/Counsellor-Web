// FAQs.jsx

import React, { useState } from 'react';
import './FAQs.css';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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
          <br/>But make sure to follow our contribution rules and regulations before making any contribution.
        </>
      ),
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqs-container">
      <h2>Frequently Asked Questions</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-item">
            <button
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index ? 'true' : 'false'}
            >
              <span className="accordion-title">{faq.question}</span>
              <span className="icon" aria-hidden="true"></span>
            </button>
            <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
