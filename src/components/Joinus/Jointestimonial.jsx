import React from 'react';
import "./Jointestimonial.css";

// Individual Story Component
const Story = ({ imgSrc, name, role, text }) => (
  <div className="story">
    <div className="story__shape">
      <img src={imgSrc} alt={`${name} - ${role}`} className="story__img" />
    </div>
    <div className="story__text">
      <h3 className="story__heading">{name}</h3>
      <p className="story__role">{role}</p>
      <p>{text}</p>
    </div>
  </div>
);

// Section Stories Component
const JoinStories = () => (
  <section className="section-stories">
    <div className="row">
      <Story
        imgSrc="https://bsa.web.unc.edu/wp-content/uploads/sites/14595/2019/10/kushal_student_profile.jpg"
        name="John Doe"
        role="Software Engineer"
        text="Working at CounsellorsWeb has been an incredible journey. The collaborative environment and the focus on innovation make every day exciting."
      />
      <Story
        imgSrc="https://img.freepik.com/free-photo/young-man-student-with-notebooks-showing-thumb-up-approval-smiling-satisfied-blue-studio-background_1258-65334.jpg"
        name="John Smith"
        role="Project Manager"
        text="The emphasis on continuous learning and professional development has helped me grow both personally and professionally."
      />
      <Story
        imgSrc="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
        name="Alan Johnson"
        role="Data Analyst"
        text="Being part of the CounsellorsWeb team has been a remarkable experience. The data-driven culture and supportive colleagues make it a great place to work."
      />
      <Story
        imgSrc="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
        name="Michael Brown"
        role="UX Designer"
        text="CounsellorsWeb has given me the opportunity to work on innovative projects and collaborate with a talented team. It's a place where creativity thrives."
      />
      <Story
        imgSrc="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
        name="Emma Wilson"
        role="Marketing Specialist"
        text="At CounsellorsWeb, I've been able to develop my skills and grow in my career. The company's commitment to employee development is truly outstanding."
      />
      <Story
        imgSrc="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
        name="David Lee"
        role="Product Manager"
        text="Working at CounsellorsWeb has been a fulfilling experience. The supportive work environment and focus on innovation make it a great place to build a career."
      />
    </div>
  </section>
);

export default JoinStories;