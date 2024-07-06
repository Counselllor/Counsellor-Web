import React, { useState } from 'react';
import './CareerSupport.css';
import Navbar from '../Navbar/Navbar';

const CareerSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="career-support">
      <Navbar />
      <header className="career-support__header">
        <h1 className="career-support__main-title">Elevate Your Career</h1>
        <p className="career-support__subtitle">Empowering professionals to reach new heights</p>
      </header>

      <section className="career-support__content">
        <h2 className="career-support__title">Our Career Support Services</h2>
        <div className="career-support__services">
          <div className="service-card">
            <div className="service-card__icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3 className="service-card__title">Job Placement</h3>
            <p className="service-card__description">
              We connect you with top employers in your field, leveraging our extensive network of industry partners.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3 className="service-card__title">Skill Development</h3>
            <p className="service-card__description">
              Enhance your skills with our targeted training programs, designed to keep you competitive in today's job market.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h3 className="service-card__title">Career Counseling</h3>
            <p className="service-card__description">
              Get personalized advice from experienced professionals to guide your career decisions and growth strategy.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <h3 className="service-card__title">Resume Building</h3>
            <p className="service-card__description">
              Craft a compelling resume that highlights your strengths and catches the eye of potential employers.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3 className="service-card__title">Interview Preparation</h3>
            <p className="service-card__description">
              Boost your confidence with mock interviews and expert tips to ace your next job interview.
            </p>
          </div>
          <div className="service-card">
            <div className="service-card__icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="service-card__title">Career Advancement</h3>
            <p className="service-card__description">
              Develop strategies for climbing the corporate ladder and achieving your long-term career goals.
            </p>
          </div>
        </div>
      </section>

      <section className="career-support__pricing">
        <h2 className="career-support__pricing-title">Career Advice Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3 className="pricing-card__title">First Session</h3>
            <p className="pricing-card__price">FREE</p>
            <ul className="pricing-card__features">
              <li>30-minute consultation</li>
              <li>Career path assessment</li>
              <li>Basic advice and guidance</li>
            </ul>
            <button className="pricing-card__button">Get Started</button>
          </div>
          <div className="pricing-card">
            <h3 className="pricing-card__title">Basic Package</h3>
            <p className="pricing-card__price">$99</p>
            <ul className="pricing-card__features">
              <li>3 one-hour sessions</li>
              <li>Personalized career plan</li>
              <li>Resume review</li>
              <li>Interview preparation</li>
            </ul>
            <button className="pricing-card__button">Choose Plan</button>
          </div>
          <div className="pricing-card">
            <h3 className="pricing-card__title">Premium Package</h3>
            <p className="pricing-card__price">$249</p>
            <ul className="pricing-card__features">
              <li>5 one-hour sessions</li>
              <li>Comprehensive career strategy</li>
              <li>LinkedIn profile optimization</li>
              <li>Job search strategy</li>
              <li>Ongoing email support</li>
            </ul>
            <button className="pricing-card__button">Choose Plan</button>
          </div>
        </div>
      </section>

      <section className="career-support__form-section">
        <h2 className="career-support__form-title">Get Personalized Career Advice</h2>
        <form className="career-support__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{width: '100%', borderColor:'#76c6f5'}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="career-support__form-submit">Send Message</button>
        </form>
      </section>

      <section className="career-support__cta">
        <h2 className="career-support__cta-title">Ready to Take the Next Step?</h2>
        <p className="career-support__cta-text">Join thousands of professionals who have accelerated their careers with our support.</p>
        <button className="career-support__cta-button">Get Started Today</button>
      </section>
    </div>
  );
};

export default CareerSupport;
