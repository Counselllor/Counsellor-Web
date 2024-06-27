import React, { useEffect, useState } from 'react';
import './Contribute.css'; // Import CSS file for styles

const Contribute = () => {
  const owner = 'Counselllor';
  const repo = 'Counsellor-Web';
  const contributorsPerPage = 10; // Display 10 contributors per page
  const [contributors, setContributors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        if (!response.ok) {
          console.error('Failed to fetch contributors:', response.statusText);
          return;
        }
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    fetchContributors();
  }, [owner, repo]);

  const handleProfileClick = (username) => {
    const profileUrl = `https://github.com/${username}`;
    window.open(profileUrl, '_blank'); // Open the GitHub profile in a new tab
  };

  const displayContributors = () => {
    const startIndex = (currentPage - 1) * contributorsPerPage;
    const endIndex = startIndex + contributorsPerPage;
    return contributors.slice(startIndex, endIndex).map(contributor => (
      <div key={contributor.login} className="contributor-card" onClick={() => handleProfileClick(contributor.login)}>
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div className="contributor-info">
          <h3>{contributor.login}</h3>
          <p>{contributor.contributions} contributions</p>
        </div>
      </div>
    ));
  };

  const createPaginationButtons = () => {
    const totalPages = Math.ceil(contributors.length / contributorsPerPage);
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="contribute-container">
      <header className="contributor-header">
        <h1 className="contributor-heading">Our Amazing Contributors</h1>
        <p className="contributor-subheading">Meet the incredible people who make our project possible. Click on their profiles to learn more about their contributions.</p>
      </header>
      <div className="thank-you-message">
        <h2>Thank You to All Our Contributors</h2>
        <p>Your hard work and dedication are truly appreciated!</p>
      </div>
      <div className="contributor-cards">
        {displayContributors()}
      </div>
      <div className="pagination">
        {createPaginationButtons()}
      </div>
    </div>
  );
};

export default Contribute;
