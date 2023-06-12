import Navbar from "../Navbar/Navbar";
import "./About.css";
import Typewriter from "typewriter-effect";

const About = () => {
  return (
    <>
      <Navbar />
      <div id="homeCircle"></div>
      <h2 className="Text">
        "Welcome fellow students, this is your ultimate companion in shaping
        your undergraduate journey and paving the way for a successful career.
        Our web application, is dedicated to assisting students like you in
        making well-informed decisions about your undergraduate studies."
      </h2>
      <div className="content">
        <ul>
          <li>
            We understand that choosing the right stream or branch for your
            undergraduate studies can be a daunting task. With so many options
            available, it's crucial to align your interests and career
            aspirations with the path you choose. That's where we comes in. Our
            platform provides a seamless experience for students to explore
            various streams and branches, enabling you to discover the perfect
            fit for your unique goals.
          </li>
          <li>
            What sets us apart is our commitment to bringing you real and honest
            insights from current college students. We believe that the best
            advice comes from those who have experienced it firsthand. Our
            platform acts as a bridge between you and these insightful
            individuals who can share their experiences, challenges, and
            triumphs. By leveraging their valuable perspectives, you can gain a
            comprehensive understanding of different colleges and make an
            informed decision about the one that suits your needs and
            preferences.
          </li>
          <li>
            Here, we recognize that undergraduate education is not just about
            attending classes; it's about crafting an experience that sets the
            stage for your future success. That's why we go beyond merely
            providing information on colleges. We strive to empower you to make
            the most of your undergraduate journey, whether it's by offering
            guidance on extracurricular activities, internships, career
            prospects, or networking opportunities.
          </li>
          <li>
            With our user-friendly interface and intuitive features, navigating
            the world of undergraduate education has never been easier. We are
            dedicated to equipping you with the tools and knowledge necessary to
            make confident choices that will shape your academic and
            professional trajectory. Join our ever-growing community of
            ambitious students who are driven to excel in their undergraduate
            studies. Let us be your trusted companion, guiding you towards a
            rewarding and fulfilling educational experience that propels you
            towards your dreams.
          </li>
        </ul>
      </div>
      <p className="ending">
        Start exploring today and unlock a world of possibilities !
      </p>

      <div id="homeCircleScnd"></div>
    </>
  );
};

export default About;
