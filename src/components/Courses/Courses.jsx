import React from 'react';
import './Courses.css';
import coursesData from './courses.json';

const Courses = () => {
  return (
    <div className="courses-container">
      <h1 className="courses-title">Available Courses</h1>
      <div className="courses-list">
        {coursesData.map((course) => (
          <div className="course-card" key={course.id}>
            <img src={course.imageURL} alt={course.title} className="course-image" />
            <div className="course-info">
              <h2 className="course-title">{course.title}</h2>
              <p className="course-description">{course.description}</p>
              <p className="course-instructor"><strong>Instructor:</strong> {course.instructor}</p>
              <p className="course-duration"><strong>Duration:</strong> {course.duration}</p>
              <p className="course-price"><strong>Price:</strong> {course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
