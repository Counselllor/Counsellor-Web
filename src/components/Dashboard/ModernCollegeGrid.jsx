import React from 'react';
import ModernCollegeCard from './ModernCollegeCard';
import './ModernCollegeCard.css';

// Modern College Grid component to display college cards in a grid layout
function ModernCollegeGrid({ colleges }) {
  // Sort colleges alphabetically by name
  const sortedColleges = [...colleges].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="colleges-grid">
      {sortedColleges.map((college, index) => (
        <ModernCollegeCard key={index} college={college} />
      ))}
    </div>
  );
}

export default ModernCollegeGrid;
