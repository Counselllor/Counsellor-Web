import { useEffect, useState } from "react";
import { signOut} from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./Courses.css";
import coursesData from "./Courses.json"; // Adjust the path as needed
import testimonialsData from "./Testimonials.json";
import Logo from "../../assets/logo.webp";

export const Courses = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <main>
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? 'show' : ''}`}>
            <ul>
              <li><a href="#">Top Universities</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Carrier Support</a></li>
              <li className='dot'><a href="#"> • </a></li>
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
                <h2 className="section-title">The Best Courses for Your <span className="span" >Academic</span> Journey</h2>
                <p className="section-text">
                    With over a decade of expertise, we&aposre dedicated to empowering individuals worldwide through accessible and innovative online learning.
                    Join us on a journey of growth and opportunity today!
                </p>
                <button className="browse-courses-btn">Browse Courses</button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="course">
            <div className="container" >
                <h1 className="heading-secondary">Discover Your Path with Us</h1>
                <div className="course-cards">
                    {coursesData.map((course) => (
                    <div key={course.id} className="course-card">
                        <div className="img-cover"><img src={course.imageURL} alt={course.title} /></div>
                            <div className="abs-badge"><span>{course.badge}</span></div>
                            <div className="card-content">
                                <h2 className="card-title">{course.title}</h2>
                                <p className="card-description">{course.description}</p>
                                <div className="wrapper">
                                    <div className="rating-wrapper"> 
                                        <h4>Rating:</h4>
                                    </div>  
                                <div className="rating-text">{course.rating}</div>
                            </div>
                            <div className="price">{course.price}</div>
                        </div>
                    </div>
                    ))}
                </div>
                <button className="btn">Explore More Courses</button>
            </div>
        </div>
        
        {/* Stats */}
        <div className="stats">
            <div className="container" >
                <div className="stats-card">
                    <h2 className="card-title">500+</h2>
                    <p className="card-text">Satisfied Graduates</p>
                </div>
                <div className="stats-card">
                    <h2 className="card-title">50+</h2>
                    <p className="card-text">Courses Offered</p>
                </div>
                <div className="stats-card">
                    <h2 className="card-title">4.5</h2>
                    <p className="card-text">Average Course Rating</p>
                </div>
            </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials">
            <div className="container" >
                <div>
                    <h2 className="heading-secondary">Empowering Success Stories</h2>
                </div>
                <div className="row">
                    {testimonialsData.map((testimonial) => (
                    <div className="story" key={testimonial.id}>
                        <figure className="story__shape">
                            <img src={testimonial.image} alt={testimonial.name} className="story__img" />
                            <figcaption className="story__caption">{testimonial.name}</figcaption>
                        </figure>
                        <div className="story__text">
                            <h3 className="heading-tertiary">{testimonial.quote}</h3>
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