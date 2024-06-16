import { useState } from "react";
import { signOut} from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Courses.css";
import coursesData from "./Courses.json";
import testimonialsData from "./Testimonials.json";
import Logo from "../../assets/logo.webp";
import ScrollToTop from "react-scroll-to-top";
import googleLogo from '../../assets/google-partner.png'
import microsoftLogo from '../../assets/microsoft_partner.png'
import metaLogo from '../../assets/meta_partner.png'
import stripeLogo from '../../assets/stripe_partner.png'
import docusignLogo from '../../assets/docusign_partner.png'
import notionLogo from '../../assets/notion_partner.png'
import airbnbLogo from '../../assets/airbnb_partner.png'
import grammarlyLogo from '../../assets/grammarly_partner.png'



export const Courses = () => {   // Course Page initialised
  const navigate = useNavigate();

  const handleSignOut = () => {   // Handles signout fn
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {    // toggle menu
    setMenuOpen(!menuOpen);
  };

  const logos = [
    googleLogo,
    docusignLogo,
    stripeLogo,
    microsoftLogo,
    airbnbLogo,
    metaLogo,
    notionLogo,
    grammarlyLogo,
  ];

  const LogoList = () => {
    return (
      <>
        {logos.map((logo, index) => (
          <div className="rfm-child" key={index}>
            <div className="client_logo">
              <img alt={`${logo.split('/').pop().split('.')[0]} brand logo`} src={logo} className="client_logo-icon" />
            </div>
          </div>
        ))}
      </>
    );
  };

  const [fix, setFix]= useState(false)
  //function for appearance of background for nav menu
  function setFixed(){
    if(window.scrollY>0){
      setFix(true)
    }else{
      setFix(false)
    }
  }

window.addEventListener("scroll", setFixed)


  return (
    <>

    <main>
        <ScrollToTop color='white' style={{backgroundColor:"#5CB6F9"}}/>
        <nav className={`navbar ${fix ? 'fixed' : ''}`}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className={`menu ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><a href="#">Top Universities</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Career Support</a></li>
            <li className='dot'><span>•</span></li>
            <li><a href="#" onClick={handleSignOut}>Log Out</a></li>
            <li><a href="#"><button className='profile_btn'>Profile</button></a></li>
          </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </nav>

        {/* About Section */}
        <div className="about">
          <div className="container">
            <div className="about-content">
              <h6 className="section-topup">Unlock Your Potential</h6>
              <h2 className="section-title">
                Crafting a Better Life Through Skill Development
              </h2>
              <p className="section-text">
                Explore our e-course platform and unlock your full potential through skill development. Build a brighter future and transform your life with our engaging & transformative courses.
              </p>
              <button className="browse-courses-btn">Explore Courses</button>
            </div>
            <div className="about-banner">
              <img src="https://isdi.in/blog/wp-content/uploads/2022/03/33.jpg" alt="" className="img-holder"/>
            </div>
          </div>
        </div>

        {/* partner */}
        <div className="partner">
          <div className="partner-heading">Our Partners</div>
          <div className="partner_wrapper">
            <div className="rfm-marquee-container">
              <div className="rfm-marquee">
                <div className="rfm-initial-child-container">
                  <LogoList />
                  <LogoList />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="achievement">
          <div className="container">
            <div className="achievement-banner">
              <img src="https://i.pinimg.com/736x/ee/af/5c/eeaf5cc3de60fa40f552e4e4be51a6ac.jpg" alt="" className="img-holder"/>
            </div>
            <div className="achievement-content">
              <h6 className="section-topup">Achievement and Milestones</h6>
              <h2 className="section-title">
                Explore the journey of our achievements and milestones
              </h2>
              <div className="stats_container">
                <div className="stats-card">
                  <h2 className="card-title">500+</h2>
                  <p className="card-text">Satisfied Graduates</p>
                </div>
                <div className="stats-card">
                  <h2 className="card-title">50+</h2>
                  <p className="card-text">Courses Offered</p>
                </div>
                <div className="stats-card">
                  <h2 className="card-title">23</h2>
                  <p className="card-text">Project Challenge</p>
                </div>
                <div className="stats-card">
                  <h2 className="card-title">100K</h2>
                  <p className="card-text">Trusted Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="course">
          <div className="container">
            <div className="header">
              <h1 >Best latest trending courses ever</h1>
              <button className="btn" >Explore all Courses <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg></button>
            </div>
            <div className="course-cards">
              {coursesData.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="img-cover">
                    <img src={course.imageURL} alt={course.title} />
                  </div>
                  <div className="abs-badge">
                    <span>{course.badge}</span>
                  </div>
                  <div className="card-content">
                    <div className="wrapper">
                      <div className="content-wrapper">
                        <span className="graph"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" /></svg></span>
                        <div className="level-text">{course.level}</div>
                      </div>
                      <div className="content-wrapper">
                        <span className="star"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg></span>
                        <div className="rating-text">{course.rating}</div>
                      </div>
                    </div>
                    <h2 className="card-title">{course.title}</h2>
                    <div className="child-wrapper">
                      <div className="content-wrapper">
                        <span className="modules"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg></span>
                        <div className="sub-text">{course.module} Modules</div>
                      </div>
                      <div className="content-wrapper">
                        <span className="time"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></span>
                        <div className="sub-text">{course.time} Hours</div>
                      </div>
                    </div>
                  </div>
                  <div className="price-wrapper">
                    <div className="price">{course.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials">
          <div className="container">
            <div>
              <h2 className="heading-secondary">+400,000 <span className="span">our student says</span></h2>
            </div>
            <div className="row"> {testimonialsData.map((testimonial) => (
                <div className="story" key={testimonial.id}>
                  <div className="testimonial-header">
                    <figure className="story__shape">
                      <img src={testimonial.image} alt={testimonial.name} className="story__img" />
                    </figure>
                    <div className="testimonial-details">
                      <h3 className="name">{testimonial.name}</h3>
                      <h3 className="job">{testimonial.job}</h3>
                    </div>
                  </div>
                  <div className="story__text">
                    <p>{testimonial.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default Courses;