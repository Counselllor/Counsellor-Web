import "./About.css";

// Banner Component
const Banner = () => {
  return (
    <header className="header">
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary__main">ABOUT US</span>
        </h1>

        <button className="btn_ btn--white btn--animated">
          Discover Who We Are?
        </button>
      </div>
    </header>
  );
};

export default Banner;
