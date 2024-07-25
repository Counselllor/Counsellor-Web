import React, { useEffect, useState, useCallback } from "react";
import "./Contribute.css"; // Import CSS file for styles
import Footer from "../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "react-scroll-to-top";
import Navbar from "../Navbar/Navbar";

const Contribute = () => {
  const owner = "Counselllor";
  const repo = "Counsellor-Web";
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        duration: 1200,
      });
    }, 100);
    return () => {
      AOS.refreshHard();
    };
  }, []);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`
        );
        if (response.ok) {
          const data = await response.json();
          setContributors(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch contributors:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, [owner, repo]);

  const handleProfileClick = (username) => {
    const profileUrl = `https://github.com/${username}`;
    window.open(profileUrl, "_blank");
  };

  const displayTopContributors = () => {
    return contributors.slice(0, 3).map((contributor) => (
      <div
        data-aos="fade-up"
        key={contributor.login}
        className="contributor-card"
        onClick={() => handleProfileClick(contributor.login)}
      >
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div className="contributor-info">
          <h3>{contributor.login}</h3>
          <p>{contributor.contributions} contributions</p>
        </div>
      </div>
    ));
  };

  const displayContributors = () => {
    return contributors.map((contributor) => (
      <div
        key={contributor.login}
        className="contributor-card"
        onClick={() => handleProfileClick(contributor.login)}
      >
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div className="contributor-info">
          <h3>{contributor.login}</h3>
          <p>{contributor.contributions} contributions</p>
        </div>
      </div>
    ));
  };

  const renderSkeletons = (count) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div className="contributor-card skeleton" key={index}>
          <div className="skeleton-avatar"></div>
          <div className="skeleton-info">
            <div className="skeleton-text skeleton-name"></div>
            <div className="skeleton-text skeleton-contributions"></div>
          </div>
        </div>
      ));
  };

  return (
    <>
      <ScrollToTop
        smooth
        viewBox="0 0 24 24"
        svgPath="M16 13a1 1 0 0 1-.707-.293L12 9.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 16 13z M16 17a1 1 0 0 1-.707-.293L12 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 16 17z"
        color="white"
        style={{ backgroundColor: "#5CB6F9" }}
      />
      <Navbar />
      <div className="contribute-container">
        <header className="contributor-header">
          <h1 className="contributor-heading">Our Amazing Contributors</h1>
          <p className="contributor-subheading">
            Meet the incredible people who make our project possible. Click on
            their profiles to learn more about their contributions.
          </p>
        </header>
        <div className="thank-you-message">
          <h2>Thank You to All Our Contributors</h2>
          <p>Your hard work and dedication are truly appreciated!</p>
        </div>
        <div className="top-contributor-cards">
          <h1>Our Top Contributors</h1>
          <div className="top-contri">
            {loading ? (
              
              renderSkeletons(3)
            
            ) : (
              displayTopContributors()
            )}
          </div>
          <h1>All Contributors</h1>
          <div className="all">
            {loading
              ? renderSkeletons(contributors.length)
              : displayContributors()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contribute;
