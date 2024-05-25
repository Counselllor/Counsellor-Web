import React, { useState } from 'react';
import explore from '../../assets/explore.png';
import explorehover from '../../assets/explorehover.png';
import college from '../../assets/college.png';
import collegehover from '../../assets/collegehover.png';
import stream from '../../assets/stream.png';
import streamhover from '../../assets/streamhover.png';
import life from '../../assets/life.png';
import lifehover from '../../assets/lifehover.png';
import "./About.css";

//Section Features
const SectionFeatures = () => {
    const [exploreHover, setExploreHover] = useState(false);
  const [collegeHover, setCollegeHover] = useState(false);
  const [lifeHover, setLifeHover] = useState(false);
  const [streamHover, setStreamHover] = useState(false);

  //Mouse Over
  const handleMouseOver = setHover => () => {
    setHover(true);
};

//Mouse Leave
const handleMouseLeave = setHover => () => {
    setHover(false);
};

  return (
    <section className="section-features">
      <div id='about-us-section-features' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className='about-us-block'>
          <button
            className='about-us-community'
            onMouseOver={handleMouseOver(setExploreHover)}
            onMouseLeave={handleMouseLeave(setExploreHover)}
            onFocus={handleMouseOver(setExploreHover)} 
            onBlur={handleMouseLeave(setExploreHover)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={exploreHover ? explorehover : explore} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '5rem' }} />
              <div className='about-us-blk-text'>Explore the World</div>
            </div>
            <p className='about-us-blk-para'>We let you know the worldwide college options which fit for you, ensuring tailored guidance and comprehensive support for your success.</p>
          </button>
          <button
            className='about-us-product'
            onMouseOver={handleMouseOver(setStreamHover)}
            onMouseLeave={handleMouseLeave(setStreamHover)}
            onFocus={handleMouseOver(setStreamHover)} 
            onBlur={handleMouseLeave(setStreamHover)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={streamHover ? streamhover : stream} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '5rem' }} />
              <div className='about-us-blk-text'>Right Stream</div>
            </div>
            <p className='about-us-blk-para'>Choosing the right stream is necessary for your career growth, enabling you to achieve your professional goals and personal aspirations.</p>
          </button>
        </div>
        <div className='about-us-block'>
          <button
            className='about-us-location'
            onMouseOver={handleMouseOver(setCollegeHover)}
            onMouseLeave={handleMouseLeave(setCollegeHover)}
            onFocus={handleMouseOver(setCollegeHover)} 
            onBlur={handleMouseLeave(setCollegeHover)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={collegeHover ? collegehover : college} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '5rem' }} />
              <div className='about-us-blk-text'>Right College</div>
            </div>
            <p className='about-us-blk-para'>Choosing the right college is necessary for your career growth, providing quality education and valuable networking opportunities for future success.</p>
          </button>
          <button
            className='about-us-event'
            onMouseOver={handleMouseOver(setLifeHover)}
            onMouseLeave={handleMouseLeave(setLifeHover)}
            onFocus={handleMouseOver(setLifeHover)} 
            onBlur={handleMouseLeave(setLifeHover)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={lifeHover ? lifehover : life} alt="" style={{ marginLeft: '1rem', marginTop: '1rem', width: '5rem' }} />
              <div className='about-us-blk-text'>Live Your Life</div>
            </div>
            <p className='about-us-blk-para'>Choose the college which you dreamt of all your life. Kudos to achieving your aspirations and embarking on an exciting journey!</p>
          </button>
        </div>
      </div>
    </section>
  )
}

export default SectionFeatures