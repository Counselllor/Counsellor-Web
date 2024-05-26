import React, { useState, useEffect } from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const result = [];
      const currentDate = new Date();

      for (let i = 0; i < 23; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);
        result.push({
          day: date.getDate(),
          weekDay: date.toLocaleString("default", { weekday: "short" }),
          isActive: i === 9, // set 10th date as active for demonstration
        });
      }

      setDates(result);
    };

    generateDates();
  }, []);

  return (
    <div className="profile-card-container ">
      <div className="greeting">
        <div className="greeting-text">
          <h1>Hello, Alex!</h1>
          <p>
            Your Profile is updated here. Dates, counselling and your Skills are
            all in one tap.
          </p>
        </div>
      </div>
      <div className="profile-card-content">
        <div className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="calendar">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`calendar-date ${date.isActive ? "active" : ""}`}
              >
                <span>{date.day}</span> <span>{date.weekDay}</span>
              </div>
            ))}
          </div>
          <p className="next-event">
            Next counselling: 22.04.2021 - Stay Connected
          </p>
        </div>
        <div className="profile-details">
          <div className="about">
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              labore distinctio optio nobis aut. Voluptatum laborum dolor fugit
              necessitatibus corrupti aspernatur, perferendis obcaecati eaque
              dolorem. Sint iusto animi minima delectus.
            </p>
          </div>
          <div className="about-info">
            <h3>Email : </h3> <p>counsellor@gmail.com</p>
          </div>
          <div className="about-info">
            <h3>Phone : </h3> <p>+918795768574</p>
          </div>
          <div className="about-info">
            <h3>Gender : </h3> <p>Male</p>
          </div>
          <div className="about-info">
            <h3>BirthDate : </h3> <p>21-1-2000</p>
          </div>
          <div className="about-info">
            <h3>College : </h3> <p>IIT Bombay</p>
          </div>
        </div>
      </div>
      <div className="profile-summary">
        <div className="profile-card">
          <i class="bx bxs-edit"></i>
          <img
            src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
            alt="Profile"
            className="profile-image"
          />
          <h3>Alex Foam</h3>
          <p className="title">IIT Bombay</p>
          <p className="role">Student</p>
          <div className="skills-section">
            <h2>Skills</h2>
            <ul>
              <li>#JavaScript</li>
              <li>#MongoDB</li>
              <li>#Node.js</li>
              <li>#HTML5</li>
              <li>#CSS3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
