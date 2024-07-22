import "./Jointestimonial.css";

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
const JoinStories = () => (
  <section className="section-stories">
    <div className="bg-video">
      <video className="bg-video__content" autoPlay muted loop>
        <source src="img/video.mp4" type="video/mp4" />
        <source src="img/video.webm" type="video/webm" />
        Your browser is not supported!
      </video>
    </div>

    <div className="row" id="join1">
      <Story
        imgSrc="https://bsa.web.unc.edu/wp-content/uploads/sites/14595/2019/10/kushal_student_profile.jpg"
        altText="Person on a Tour"
        caption="Jane Doe"
        heading="Jane Doe,Software Engineer"
        text="Working at CounsellorsWeb has been an incredible journey. The collaborative environment and the focus on innovation make every day exciting."
      />
    </div>

    <div className="row" id="join2">
      <Story
        imgSrc="https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65334.jpg"
        altText="Person on a Tour"
        caption="John Smith"
        heading="John Smith, Project Manager"
        text="The emphasis on continuous learning and professional development has helped me grow both personally and professionally."
      />
    </div>
  </section>
);

export default JoinStories;
