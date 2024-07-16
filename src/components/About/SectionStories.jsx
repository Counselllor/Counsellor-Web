import "./About.css";

// Individual Story Component
const Story = ({ imgSrc, altText, caption, heading, text }) => (
  <div className="story">
    <figure className="story__shape">
      <img src={imgSrc} alt={altText} className="story__img" />
      <figcaption className="story__caption">{caption}</figcaption>
    </figure>
    <div className="story__text">
      <h3 className="heading-tertiary u-margin-bottom-small">{heading}</h3>
      <p>{text}</p>
    </div>
  </div>
);

// Section Stories Component
const SectionStories = () => (
  <section className="section-stories">
    <div className="bg-video">
      <video className="bg-video__content" autoPlay muted loop>
        <source src="img/video.mp4" type="video/mp4" />
        <source src="img/video.webm" type="video/webm" />
        Your browser is not supported!
      </video>
    </div>
    <div className="u-center-text u-margin-bottom-large">
      <h2 className="heading-secondary">
        We Make People Genuinely Happy
      </h2>
    </div>

    <div className="row">
      <Story
        imgSrc="https://bsa.web.unc.edu/wp-content/uploads/sites/14595/2019/10/kushal_student_profile.jpg"
        altText="Person on a Tour"
        caption="Jaden Smith"
        heading="I got the best college with their guidance"
        text="The counsellors at Counsellor-Web are committed to helping clients achieve their goals. I've gained valuable insights and coping strategies"
      />
    </div>

    <div className="row">
      <Story
        imgSrc="https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65334.jpg"
        altText="Person on a Tour"
        caption="Jack Wilson"
        heading="Wow! My life is completely different now"
        text="Highly recommend Counsellor-Web for anyone seeking professional counseling. They helped me navigate through a difficult time with empathy and expertise"
      />
    </div>
  </section>
);

export default SectionStories;
