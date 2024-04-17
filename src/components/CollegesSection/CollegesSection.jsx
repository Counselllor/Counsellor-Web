import React, { useState, useEffect } from "react";
import "./CollegesSection.css";
import CollegeCard from "../CollegeCard/CollegeCard";

const CollegesSection = ({ collegeData, searchQuery }) => {
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    // Filter colleges based on search query
    const filtered = Object.values(collegeData).filter((college) =>
      college.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredColleges(filtered);
  }, [collegeData, searchQuery]);

  return (
    <div className="colleges">
      {filteredColleges.map((college, index) => (
        <CollegeCard key={index} college={college} />
      ))}
    </div>
  );
};

export default CollegesSection;
