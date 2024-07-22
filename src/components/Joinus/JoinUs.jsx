import React, {useEffect, useState } from "react";
import "./Joinus.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import BackToHomeButton from "../backtohome";
import Navbar from "../Navbar/Navbar";
import JoinStories from "./Jointestimonial";


const JoinUs = () => {



const navigate = useNavigate();

let [isLoggedIn,setLogin]=useState(false)
  useEffect(() => {
    if(localStorage.getItem('login')){

      setLogin(true)
    }
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     // handle user logged in state
    //   } else {
        
    //   }
    // });
  }, [navigate]);

  return (
    <>
      <Navbar />
      {/* <BackToHomeButton /> */}
      <div>
        <div className="join-us-container">
          <div className="contents">
            <h1>Join Us</h1>
            <section id="benefitsnew" className="joinnew">
              <h2>Why Join Our Team?</h2>
              <p>
                At CounsellorsWeb, we are dedicated to fostering a work
                environment that is inclusive, innovative, and conducive to
                professional growth. Here are just a few reasons why you should
                consider joining our team:
              </p>
              <div className="whynew">
                <div className="whynewbox">
                  <h3>🌟Innovative projects and cutting-edge technology</h3>
                  <p>
                    Engage in pioneering projects that utilize the latest
                    technologies, pushing the boundaries of innovation. Be at
                    the forefront of technological advancements, creating
                    impactful solutions.
                  </p>
                </div>
                <div className="whynewbox">
                  <h3>🌍 Collaborative and inclusive work environment</h3>
                  <p>
                    Join a team that values diversity and inclusivity, fostering
                    a culture of collaboration. Work together in a supportive
                    environment where every voice is heard and respected.
                  </p>
                </div>
                <div className="whynewbox">
                  <h3>📈 Opportunities for professional growth</h3>
                  <p>
                    Access numerous opportunities for career advancement and
                    skill development. Grow professionally through mentorship,
                    challenging projects, and continuous learning.
                  </p>
                </div>
                <div className="whynewbox">
                  <h3>🎁 Competitive salaries and benefits</h3>
                  <p>
                    Enjoy a competitive salary package along with comprehensive
                    benefits. Experience financial stability and rewards that
                    reflect your hard work and dedication in your journey.
                  </p>
                </div>
                <div className="whynewbox">
                  <h3>⏰ Flexible working hours and remote work options</h3>
                  <p>
                    Benefit from flexible working hours and the option to work
                    remotely. Achieve a healthy work-life balance while
                    maintaining productivity and job satisfaction throughout.
                  </p>
                </div>
                <div className="whynewbox">
                  <h3>🏃‍♀️Health and wellness programs</h3>
                  <p>
                    Take advantage of health and wellness programs designed to
                    support your physical and mental well-being. Participate in
                    activities and initiatives that promote a healthy lifestyle.
                  </p>
                </div>
                <div className="whynewbox">
                  <h3>📚 Ongoing training and development</h3>
                  <p>
                    Engage in continuous training and development programs.
                    Enhance your skills and knowledge through workshops,
                    courses, and certifications tailored to your career goals.
                  </p>
                </div>
                <div className="whynewbox">
                  <h3>🏆 Employee recognition and rewards programs</h3>
                  <p>
                    Be acknowledged for your hard work and achievements through
                    structured recognition and rewards programs. Enjoy a culture
                    that celebrates successes and motivates employees with
                    meaningful incentives.
                  </p>
                </div>
              </div>
            </section>
            <section id="culturenew">
              <h2>Our Culture</h2>
              <p>
                Our company culture is built on mutual respect, continuous
                learning, and a passion for excellence. We believe that a
                positive and supportive workplace leads to higher productivity
                and job satisfaction. Here’s what you can expect when you join
                us:
              </p>
              <ol className="cultin">
                <li className="text">Regular team - building activities</li>
                <li className="text">Open-door policy and management</li>
                <li className="text">Encouraging of a work-life balance</li>
                <li className="text">Diversity and inclusion initiatives do</li>
                <li className="text">
                  Community involvement and social responsibility
                </li>
                <li className="text">
                  Opportunities for career growth and development
                </li>
              </ol>
            </section>
            <section id="testimonialsnew">
              <h2>Employee Testimonials</h2>
              <p>
                Don’t just take our word for it. Here’s what some of our
                employees have to say about working at CounsellorsWeb:
              </p>
              <JoinStories />
            </section>
            <section id="positionsnew">
              <h2>Open Positions</h2>
              <p>
                We are always looking for talented individuals to join our team.
                Check out our <Link to="/careers">careers page</Link> for
                current openings.
              </p>
            </section>
            <section id="applynew">
              <h2>How to Apply</h2>
              <p>
                Interested in joining us? Send your resume and a cover letter to{" "}
                <a href="mailto:careers@counsellorsweb.com">
                  careers@counsellorsweb.com
                </a>
                . In your cover letter, please include:
              </p>
              <ol className="cultin">
                <li className="text">A brief introduction about yourself</li>
                <li className="text">
                  Why you are interested in joining Counsellors Web
                </li>
                <li className="text">What you can bring to our team</li>
                <li className="text">Your relevant skills and experience</li>
              </ol>
            </section>
          </div>
        </div>
        <hr />
        <Footer />
      </div>
    </>
  );
};

export default JoinUs;
