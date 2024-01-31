import Logo from "../../assets/logo.webp";
import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        console.log("");
      } else if (!user) {
        navigate("/");
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
        <nav className="navbar">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className={`menu ${menuOpen ? "show" : ""}`}>
            <ul>
              <li>
                <a href="#">Top Universities</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">Courses</a>
              </li>
              <li>
                <a href="#">Carrier Support</a>
              </li>
              <li className="dot">
                <a href="#">•</a>
              </li>
              <li>
                <a href="#" onClick={handleSignOut}>
                  Log Out
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="profile_btn">Profile</button>
                </a>
              </li>
            </ul>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
            <div className={`bar ${menuOpen ? "open" : ""}`}></div>
          </div>
        </nav>

        <div>
          <header class="header">
            <div class="header__text-box">
              <h1 class="heading-primary">
                <span class="heading-primary__main">ABOUT US</span>
              </h1>

              <a href="#" class="btn_ btn--white btn--animated">
                Discover Who We Are?
              </a>
            </div>
          </header>

          <main>
            <section class="section-about">
              <div class="u-center-text u-margin-bottom-large">
                <h2 class="heading-secondary">
                  Behold For What We Present You
                </h2>
              </div>

              <div class="row">
                <div class="col-1-of-2">
                  <h3 class="heading-tertiary u-margin-bottom-small">
                    Our mission? To bestow upon students the gift of wisdom,
                    aiding them in their quest for undergraduate enlightenment.
                    Prepare to witness the extraordinary!
                  </h3>
                  <p class="paragraph">
                    Within these virtual walls, students will uncover a treasure
                    trove of streams and branches, carefully curated to match
                    their very souls, their passions, and their wildest career
                    aspirations. No stone shall be left unturned, no path left
                    unexplored! But wait, dear traveler, there's more! We bring
                    forth the whispers of the present, the tales of those who
                    have embarked on this hallowed journey before you. Hear the
                    unfiltered truths, the real-life sagas, as they guide you
                    towards the perfect college. For in the realm of education,
                    one size does not fit all. Let your desires and preferences
                    reign supreme!
                  </p>
                </div>

                <div class="col-1-of-2">
                  <div class="composition">
                    <img
                      src="https://t4.ftcdn.net/jpg/05/39/10/47/360_F_539104776_BchIZKRhIUXDY0ZaVHxaoIDvRa2eAG3d.jpg"
                      alt="photo 1"
                      class="composition__photo composition__photo--p1"
                    />
                    <img
                      src="https://www.thestatesman.com/wp-content/uploads/2020/09/QT-Indian-students.jpg"
                      alt="photo 2"
                      class="composition__photo composition__photo--p2"
                    />
                    <img
                      src="https://t3.ftcdn.net/jpg/03/88/97/92/360_F_388979227_lKgqMJPO5ExItAuN4tuwyPeiknwrR7t2.jpg"
                      alt="photo 3"
                      class="composition__photo composition__photo--p3"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section class="section-features">
              <div class="row">
                <div class="col-1-of-4">
                  <div class="feature-box">
                    <i class="feature-box__icon icon-basic-world"></i>
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      Explore the World
                    </h3>
                    <p class="feature-box__text">
                      We let you know the worldwide college options which fits
                      for you
                    </p>
                  </div>
                </div>

                <div class="col-1-of-4">
                  <div class="feature-box">
                    <i class="feature-box__icon icon-basic-compass"></i>
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      Right Stream
                    </h3>
                    <p class="feature-box__text">
                      Choosing Right stream is necessary for your career growth
                    </p>
                  </div>
                </div>

                <div class="col-1-of-4">
                  <div class="feature-box">
                    <i class="feature-box__icon icon-basic-map"></i>
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      Right College
                    </h3>
                    <p class="feature-box__text">
                      Choosing Right College is necessary for your career growth
                    </p>
                  </div>
                </div>

                <div class="col-1-of-4">
                  <div class="feature-box">
                    <i class="feature-box__icon icon-basic-heart"></i>
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      Live Your Life
                    </h3>
                    <p class="feature-box__text">
                      Choose the college which you dreamt all your life.
                      Kudos!!!!
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section class="section-tours">
              <div class="u-center-text u-margin-bottom-large">
                <h2 class="heading-secondary">Happy Statistics</h2>
              </div>

              <div class="row">
                <div class="col-1-of-3">
                  <div class="card">
                    <div class="card__side card__side--front">
                      <div class="card__picture card__picture--1">&nbsp;</div>
                      <h4 class="card__heading">
                        <span class="card__heading-span card__heading-span--1">
                          Indian Colleges
                        </span>
                      </h4>
                      <div class="card__details">
                        <ul>
                          <li>3000+</li>
                          <li>Up to 500 Students</li>
                          <li>5 Guides</li>
                          <li>Choose Top Notch</li>
                          <li>Feedback: 5+ Stars</li>
                        </ul>
                      </div>
                    </div>
                    <div class="card__side card__side--back card__side--back-1">
                      <div class="card__cta">
                        <div class="card__price-box">
                          <p class="card__price-only">Explore Colleges</p>
                          <p class="card__price-value">3000+</p>
                        </div>
                        <a href="#popup" class="btn_ btn--white">
                          Explore Now!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-1-of-3">
                  <div class="card">
                    <div class="card__side card__side--front">
                      <div class="card__picture card__picture--2">&nbsp;</div>
                      <h4 class="card__heading">
                        <span class="card__heading-span card__heading-span--2">
                          American Colleges
                        </span>
                      </h4>
                      <div class="card__details">
                        <ul>
                          <li>300+</li>
                          <li>Up to 40 Students</li>
                          <li>6 Guides</li>
                          <li>Fits Best For You</li>
                          <li>Feedback: 4+ Stars</li>
                        </ul>
                      </div>
                    </div>
                    <div class="card__side card__side--back card__side--back-2">
                      <div class="card__cta">
                        <div class="card__price-box">
                          <p class="card__price-only">Explore Colleges</p>
                          <p class="card__price-value">300+</p>
                        </div>
                        <a href="#popup" class="btn_ btn--white">
                          Explore Now!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-1-of-3">
                  <div class="card">
                    <div class="card__side card__side--front">
                      <div class="card__picture card__picture--3">&nbsp;</div>
                      <h4 class="card__heading">
                        <span class="card__heading-span card__heading-span--3">
                          Austrian Colleges
                        </span>
                      </h4>
                      <div class="card__details">
                        <ul>
                          <li>100+</li>
                          <li>Up to 15 Students</li>
                          <li>3 Guides</li>
                          <li>Go Worldwide</li>
                          <li>Feedback: 4+ Stars</li>
                        </ul>
                      </div>
                    </div>
                    <div class="card__side card__side--back card__side--back-3">
                      <div class="card__cta">
                        <div class="card__price-box">
                          <p class="card__price-only">Explore Colleges</p>
                          <p class="card__price-value">100+</p>
                        </div>
                        <a href="#popup" class="btn_ btn--white">
                          Explore Now!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="u-center-text u-margin-top-huge">
                <a href="./dashboard" class="btn_ btn--green">
                  Discover All
                </a>
              </div>
            </section>

            <section class="section-stories">
              <div class="bg-video">
                <video class="bg-video__content" autoplay muted loop>
                  <source src="img/video.mp4" type="video/mp4" />
                  <source src="img/video.webm" type="video/webm" />
                  Your browser is not supported!
                </video>
              </div>
              <div class="u-center-text u-margin-bottom-large">
                <h2 class="heading-secondary">
                  We Make People Genuinely Happy
                </h2>
              </div>

              <div class="row">
                <div class="story">
                  <figure class="story__shape">
                    <img
                      src="https://bsa.web.unc.edu/wp-content/uploads/sites/14595/2019/10/kushal_student_profile.jpg"
                      alt="Person on a Tour"
                      class="story__img"
                    />
                    <figcaption class="story__caption">Mary Smith</figcaption>
                  </figure>

                  <div class="story__text">
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      I got the best college with their guidance
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vitae voluptatibus accusantium esse quibusdam repellat
                      molestiae a modi non, incidunt nisi minus labore quas
                      blanditiis mollitia autem sapiente sint laboriosam fugiat?
                    </p>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="story">
                  <figure class="story__shape">
                    <img
                      src="https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65334.jpg"
                      alt="Person on a Tour"
                      class="story__img"
                    />
                    <figcaption class="story__caption">Jack Wilson</figcaption>
                  </figure>

                  <div class="story__text">
                    <h3 class="heading-tertiary u-margin-bottom-small">
                      Wow! My life is completely different now
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vitae voluptatibus accusantium esse quibusdam repellat
                      molestiae a modi non, incidunt nisi minus labore quas
                      blanditiis mollitia autem sapiente sint laboriosam fugiat?
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* <div className="maintxt" style={{padding: '0rem 11vw 15vw 11vw'}}>
          <h1><span className="blue">About </span>Us<br/></h1>
          <p>For the Students, By the Students</p>
          <p>
          Behold, for we present to you our awe-inspiring web application, crafted with the mystical powers of ReactJS. Our mission? To bestow upon students the gift of wisdom, aiding them in their quest for undergraduate enlightenment. Prepare to witness the extraordinary!
          </p>
          <p>

Within these virtual walls, students will uncover a treasure trove of streams and branches, carefully curated to match their very souls, their passions, and their wildest career aspirations. No stone shall be left unturned, no path left unexplored!

But wait, dear traveler, there's more! We bring forth the whispers of the present, the tales of those who have embarked on this hallowed journey before you. Hear the unfiltered truths, the real-life sagas, as they guide you towards the perfect college. For in the realm of education, one size does not fit all. Let your desires and preferences reign supreme!</p>
          <p>

With our divine knowledge at your fingertips, you shall seize the undergraduate throne and forge a destiny unlike any other. Unleash the power within, embrace the possibilities, and embark on the path to triumph.
</p>
          <p>
Enter our realm, intrepid adventurer, and let us be your guiding light in the boundless universe of higher education. Together, we shall illuminate your future with brilliance and triumph!
          </p>
        </div> */}

        <Footer />
      </main>
    </>
  );
};

export default About;
