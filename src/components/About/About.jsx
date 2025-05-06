import Footer from "../Footer/Footer";
import "./About.css";
import Banner from "./Banner";
import SectionAbout from "./SectionAbout";
import SectionFeatures from "./SectionFeatures";
import SectionStories from "./SectionStories";
import SectionTours from "./SectionTours";
import ConditionalNavbar from "../Navbar/ConditionalNavbar";

//About Us
const About = () => {
  return (
    <main>
      <ConditionalNavbar />
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
