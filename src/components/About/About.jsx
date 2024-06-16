import Footer from "../Footer/Footer";
import "./About.css";
import Navbar from "./Navbar";
import Banner from "./Banner";
import SectionAbout from "./SectionAbout";
import SectionFeatures from "./SectionFeatures";
import SectionStories from "./SectionStories";
import SectionTours from "./SectionTours";

//About Us
const About = () => {
  return (
    <main>
      <Navbar/>
      <Banner/>
      <SectionAbout/>
      <SectionFeatures/>
      <SectionTours/>
      <SectionStories/>
      <Footer />
    </main>
  );
};

export default About;
