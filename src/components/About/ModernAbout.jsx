import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import ConditionalNavbar from "../Navbar/ConditionalNavbar";
import Footer from "../Footer/Footer";
import "./modern-about.css";

// Import icons/images
import exploreIcon from "../../assets/explore.png";
import collegeIcon from "../../assets/college.png";
import streamIcon from "../../assets/stream.png";
import lifeIcon from "../../assets/life.png";

const ModernAbout = () => {
  const { theme } = useContext(ThemeContext);
  
  // Fix for double scrollbar issue
  useEffect(() => {
    // Set body overflow to hidden when component mounts
    document.body.style.overflow = 'hidden';
    
    // Reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modern-about" id={theme}>
      <ConditionalNavbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1>About Counsellor</h1>
          <p>
            Empowering students to make informed decisions about their educational journey
            and future career paths through personalized guidance and authentic insights.
          </p>
          <Link to="/" className="hero-cta">
            Get Started
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              At Counsellor, we believe that every student deserves access to quality
              education guidance that aligns with their unique interests, aptitudes, and
              career aspirations. Our platform bridges the gap between students and
              educational opportunities by providing comprehensive, unbiased information.
            </p>
            <p>
              We feature authentic experiences and testimonials from current students and
              alumni, offering valuable insights into college life and career trajectories.
              Our goal is to help each student find the path that best suits their unique
              needs and ambitions.
            </p>
          </div>
          <div className="mission-image">
            <div className="mission-image-grid">
              <div className="mission-image-item">
                <img
                  src="https://t4.ftcdn.net/jpg/05/39/10/47/360_F_539104776_BchIZKRhIUXDY0ZaVHxaoIDvRa2eAG3d.jpg"
                  alt="Students collaborating"
                />
              </div>
              <div className="mission-image-item">
                <img
                  src="https://www.thestatesman.com/wp-content/uploads/2020/09/QT-Indian-students.jpg"
                  alt="Students in classroom"
                />
              </div>
              <div className="mission-image-item">
                <img
                  src="https://t3.ftcdn.net/jpg/03/88/97/92/360_F_388979227_lKgqMJPO5ExItAuN4tuwyPeiknwrR7t2.jpg"
                  alt="Student studying"
                />
              </div>
              <div className="mission-image-item">
                <img
                  src="https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65334.jpg"
                  alt="Happy student"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-heading">
            <h2>What We Offer</h2>
            <p>
              Discover how Counsellor can help you navigate your educational journey
              with confidence and clarity.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src={exploreIcon} alt="Explore icon" />
              </div>
              <h3>Explore the World</h3>
              <p>
                We provide worldwide college options tailored to your needs,
                ensuring comprehensive guidance and support for your success.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={streamIcon} alt="Stream icon" />
              </div>
              <h3>Right Stream</h3>
              <p>
                Choose the right academic stream for your career growth,
                enabling you to achieve your professional goals and personal aspirations.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={collegeIcon} alt="College icon" />
              </div>
              <h3>Right College</h3>
              <p>
                Find the perfect college that provides quality education and
                networking opportunities essential for your future success.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <img src={lifeIcon} alt="Life icon" />
              </div>
              <h3>Live Your Life</h3>
              <p>
                Choose the college you've always dreamed of and embark on an
                exciting journey toward achieving your aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-heading">
            <h2>Our Impact</h2>
            <p>
              We're proud of the difference we've made in students' educational journeys.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">3000+</div>
              <div className="stat-label">Indian Colleges</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">300+</div>
              <div className="stat-label">American Colleges</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Austrian Colleges</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Students Helped</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-heading">
            <h2>Student Success Stories</h2>
            <p>
              Hear from students who found their perfect educational path with Counsellor.
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  The counsellors at Counsellor-Web are committed to helping clients achieve their goals. 
                  I've gained valuable insights and coping strategies that helped me find my dream college.
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-author-image">
                  <img
                    src="https://bsa.web.unc.edu/wp-content/uploads/sites/14595/2019/10/kushal_student_profile.jpg"
                    alt="Jaden Smith"
                  />
                </div>
                <div className="testimonial-author-info">
                  <h4>Jaden Smith</h4>
                  <p>Computer Science Student</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  Highly recommend Counsellor-Web for anyone seeking professional counseling. 
                  They helped me navigate through a difficult time with empathy and expertise.
                </p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-author-image">
                  <img
                    src="https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65334.jpg"
                    alt="Jack Wilson"
                  />
                </div>
                <div className="testimonial-author-info">
                  <h4>Jack Wilson</h4>
                  <p>Engineering Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Join thousands of students who have found their perfect educational path with Counsellor.
          </p>
          <div className="cta-buttons">
            <Link to="/" className="cta-button cta-button-primary">
              Log In
            </Link>
            <Link to="/signup" className="cta-button cta-button-secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ModernAbout;