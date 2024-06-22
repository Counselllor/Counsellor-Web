import React, { useEffect, useState } from 'react';
import './Contribute.css'; // Import CSS file for styles

const Contribute = () => {
  const owner = 'Counselllor';
  const repo = 'Counsellor-Web';
  const contributorsPerPage = 5; // Changed to display 5 contributors per page
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
      <div key={contributor.login} className="contributor-member" onClick={() => handleProfileClick(contributor.login)}>
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div>
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
    <div>
      <h1 className='contributor-heading'>Our Contributors</h1>
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
