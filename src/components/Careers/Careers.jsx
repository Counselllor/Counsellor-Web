import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Careers.css';

const Careers = () => {
  const { theme } = useContext(ThemeContext);

  const openPositions = [
    {
      id: 1,
      title: 'Software Developer',
      department: 'Engineering',
      location: 'Remote',
      description: 'We are looking for a skilled software developer to join our engineering team. The ideal candidate will have experience with React, Node.js, and database technologies.',
      requirements: [
        'Bachelor\'s degree in Computer Science or related field',
        '3+ years of experience in web development',
        'Proficiency in JavaScript, React, and Node.js',
        'Experience with database technologies (SQL, NoSQL)',
        'Strong problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      description: 'We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio demonstrating their design skills.',
      requirements: [
        'Bachelor\'s degree in Design, HCI, or related field',
        '2+ years of experience in UX/UI design',
        'Proficiency in design tools (Figma, Adobe XD, Sketch)',
        'Understanding of user-centered design principles',
        'Strong communication skills'
      ]
    },
    {
      id: 3,
      title: 'Content Writer',
      department: 'Marketing',
      location: 'Remote',
      description: 'We are looking for a creative Content Writer to join our marketing team. The ideal candidate will create engaging content for our blog, social media, and other channels.',
      requirements: [
        'Bachelor\'s degree in English, Journalism, or related field',
        '2+ years of experience in content writing',
        'Excellent writing and editing skills',
        'SEO knowledge',
        'Ability to meet deadlines'
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <div className="careers-container">
        <header className="careers-header">
          <h1>Career Opportunities</h1>
          <p>Join our team and make a difference</p>
        </header>

        <section className="careers-intro">
          <h2>Why Work With Us?</h2>
          <p>
            At Counsellor Social, we're building a platform that connects individuals with professional counselors and offers a variety of technical services. We're looking for passionate individuals who want to make a positive impact on people's lives.
          </p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="fas fa-laptop-code"></i>
              <h3>Remote Work</h3>
              <p>Enjoy the flexibility of working from anywhere</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-users"></i>
              <h3>Collaborative Culture</h3>
              <p>Work with a diverse team of talented professionals</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-chart-line"></i>
              <h3>Growth Opportunities</h3>
              <p>Continuous learning and career advancement</p>
            </div>
            <div className="benefit-card">
              <i className="fas fa-heart"></i>
              <h3>Meaningful Work</h3>
              <p>Make a positive impact on people's lives</p>
            </div>
          </div>
        </section>

        <section className="open-positions">
          <h2>Open Positions</h2>
          <div className="positions-list">
            {openPositions.map(position => (
              <div key={position.id} className="position-card">
                <h3>{position.title}</h3>
                <div className="position-meta">
                  <span><i className="fas fa-building"></i> {position.department}</span>
                  <span><i className="fas fa-map-marker-alt"></i> {position.location}</span>
                </div>
                <p>{position.description}</p>
                <div className="requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {position.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button className="apply-button">Apply Now</button>
              </div>
            ))}
          </div>
        </section>

        <section className="application-process">
          <h2>Application Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Submit Application</h3>
              <p>Send your resume and cover letter to <a href="mailto:careers@counsellorsweb.com">careers@counsellorsweb.com</a></p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Initial Screening</h3>
              <p>Our HR team will review your application and reach out if there's a good fit</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Interviews</h3>
              <p>Multiple rounds of interviews with team members and leadership</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Offer</h3>
              <p>If selected, you'll receive an offer letter with details about compensation and benefits</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Questions?</h2>
          <p>If you have any questions about our open positions or the application process, please contact us at <a href="mailto:careers@counsellorsweb.com">careers@counsellorsweb.com</a>.</p>
          <div className="cta-buttons">
            <Link to="/join-us" className="cta-button">Learn More About Us</Link>
            <Link to="/contact" className="cta-button secondary">Contact Us</Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Careers;
