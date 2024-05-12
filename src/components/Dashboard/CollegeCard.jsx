import React from 'react'

function CollegeCard({college}) {
  return (
    <div className="college">
    <div className="up">
      <img src={college.imageURL} alt="College Logo" />
      <div className="context">
        <p>{college.name}</p>
        <span>{college.location}</span>
      </div>
    </div>
    <div className="down">
      <div className="ctc">{college.ctc}</div>
      <div className="time">{college.time}</div>
    </div>
  </div>
  )
}

export default CollegeCard