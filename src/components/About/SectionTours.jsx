import "./About.css";

// Card Front Component
const CardFront = ({ pictureClass, heading, headingSpan, details }) => (
  <div className="card__side card__side--front">
    <div className={`card__picture ${pictureClass}`}>&nbsp;</div>
    <h4 className="card__heading">
      <span className={`card__heading-span ${headingSpan}`}>
        {heading}
      </span>
    </h4>
    <div className="card__details">
      <ul>
        {details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  </div>
);

// Card Back Component
const CardBack = ({ className, priceValue }) => (
  <div className={className}>
    <div className="card__cta">
      <div className="card__price-box">
        <p className="card__price-only">Explore Colleges</p>
        <p className="card__price-value">{priceValue}</p>
      </div>
      <a href="#popup" className="btn_ btn--white">
        Explore Now!
      </a>
    </div>
  </div>
);

// Card Component
const Card = ({ className, heading, headingSpan, pictureClass, details, priceValue }) => (
  <div className="col-1-of-3">
    <div className="card">
      <CardFront pictureClass={pictureClass} heading={heading} headingSpan={headingSpan} details={details} />
      <CardBack priceValue={priceValue} className={className}/>
    </div>
  </div>
);

// Section Tours Component
const SectionTours = () => (
  <section className="section-tours">
    <div className="u-center-text u-margin-bottom-large">
      <h2 className="heading-secondary">Happy Statistics</h2>
    </div>

    <div className="row">
      <Card
        className="card__side card__side--back card__side--back-1"
        id="indian-colleges"
        heading="Indian Colleges"
        headingSpan="card__heading-span--1"
        pictureClass="card__picture--1"
        details={[
          "3000+",
          "Up to 500 Students",
          "5 Guides",
          "Choose Top Notch",
          "Feedback: 5+ Stars"
        ]}
        priceValue="3000+"
      />
      <Card
        className="card__side card__side--back card__side--back-2"
        id="american-colleges"
        heading="American Colleges"
        headingSpan="card__heading-span--2"
        pictureClass="card__picture--2"
        details={[
          "300+",
          "Up to 40 Students",
          "6 Guides",
          "Fits Best For You",
          "Feedback: 4+ Stars"
        ]}
        priceValue="300+"
      />
      <Card
        className="card__side card__side--back card__side--back-3"
        id="austrian-colleges"
        heading="Austrian Colleges"
        headingSpan="card__heading-span--3"
        pictureClass="card__picture--3"
        details={[
          "100+",
          "Up to 15 Students",
          "3 Guides",
          "Go Worldwide",
          "Feedback: 4+ Stars"
        ]}
        priceValue="100+"
      />
    </div>

    <div className="u-center-text u-margin-top-huge">
      <a href="./dashboard" className="btn_ btn--green">
        Discover All
      </a>
    </div>
  </section>
);

export default SectionTours;
