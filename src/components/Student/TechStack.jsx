import React from "react";
import "./TechStack.css";
import studentData from '../CollegePage/students.json';

const TechStack = () => {
  const techStacks = [
    { name: 'React', icon: '🔵' },
    { name: 'Next.js', icon: '🟢' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express', icon: '⚡' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'HTML5', icon: '🟧' },
    { name: 'CSS3', icon: '🔵' },
    { name: 'Tailwind CSS', icon: '💨' },
    { name: 'Redux', icon: '🟣' },
    { name: 'GraphQL', icon: '🔶' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '☸️' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Git', icon: '🔴' },
    { name: 'GitHub', icon: '🐱' },
  ];

  const getStudentTechStacks = () => {
    const studentSkills = studentData.flatMap(student => student.skills);
    return techStacks.filter(tech => studentSkills.includes(tech.name));
  };

  const studentTechStacks = getStudentTechStacks();

  return (
    <div className="tech-stack-container">
      <h2 className="tech-stack-title">Tech Stack</h2>
      <div className="tech-stack-grid">
        {studentTechStacks.map((tech, index) => (
          <div className="tech-stack-item" key={index}>
            <span className="tech-stack-icon">{tech.icon}</span>
            <span className="tech-stack-name">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
