import React from 'react';
import { useParams } from 'react-router-dom';
import './Slots.css'; // Import the CSS for styling
import studentData from '../CollegePage/students.json';

const Slots = () => {
  const { id } = useParams(); // Get the student ID from the URL

  const student = studentData.find(student => student.id === parseInt(id)); // Find the student by ID

  if (!student) {
    return <div className="slots-container">Student not found</div>;
  }

  const availableSlots = student.availableSlots;

  return (
    <div className="slots-container">
      <h2 className="slots-title">Available Slots for {student.name}</h2>
      <div className="slots-grid">
        {availableSlots.map((slot, index) => (
          <div className="slot-item" key={index}>
            <span className="slot-time">{slot}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slots;
