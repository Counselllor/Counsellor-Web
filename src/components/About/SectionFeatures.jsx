import { useState, useCallback } from 'react';
import explore from '../../assets/explore.png';
import explorehover from '../../assets/explorehover.png';
import college from '../../assets/college.png';
import collegehover from '../../assets/collegehover.png';
import stream from '../../assets/stream.png';
import streamhover from '../../assets/streamhover.png';
import life from '../../assets/life.png';
import lifehover from '../../assets/lifehover.png';

// Feature Button Component
const FeatureButton = ({ className, image, hoverImage, altText, title, description }) => {
  const [hover, setHover] = useState(false);

  //mouseover
  const handleMouseOver = useCallback(() => {
    setHover(true);
  }, []);

  //mouseleave
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  //handle focus
  const handleFocus = useCallback(() => {
    setHover(true);
  }, []);

  //handle blur
  const handleBlur = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <button
      className={className}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src={hover ? hoverImage : image} alt={altText} style={{ marginLeft: '1rem', marginTop: '1rem', width: '5rem' }} />
        <div className='about-us-blk-text'>{title}</div>
      </div>
      <p className='about-us-blk-para'>{description}</p>
    </button>
  );
};

// Section Features Component
const SectionFeatures = () => {
  return (
    <section className="section-features">
      <div id='about-us-section-features' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className='about-us-block'>
          <FeatureButton
            className='about-us-community'
            image={explore}
            hoverImage={explorehover}
            altText="Explore"
            title="Explore the World"
            description="We let you know the worldwide college options which fit for you, ensuring tailored guidance and comprehensive support for your success."
          />
          <FeatureButton
            className='about-us-product'
            image={stream}
            hoverImage={streamhover}
            altText="Stream"
            title="Right Stream"
            description="Choosing the right stream is necessary for your career growth, enabling you to achieve your professional goals and personal aspirations."
          />
        </div>
        <div className='about-us-block'>
          <FeatureButton
            className='about-us-location'
            image={college}
            hoverImage={collegehover}
            altText="College"
            title="Right College"
            description="Choosing the right college is necessary for your career growth, providing quality education and networking opportunities for future success."
          />
          <FeatureButton
            className='about-us-event'
            image={life}
            hoverImage={lifehover}
            altText="Life"
            title="Live Your Life"
            description="Choose the college which you dreamt of all your life. Kudos to achieving your aspirations and embarking on an exciting journey!"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionFeatures;
