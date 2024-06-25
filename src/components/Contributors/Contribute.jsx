import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const Contribute = () => {
  const owner = 'Counselllor';
  const repo = 'Counsellor-Web';
  const contributorsPerPage = 10;
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
    window.open(profileUrl, '_blank');
  };

  const displayContributors = () => {
    const startIndex = (currentPage - 1) * contributorsPerPage;
    const endIndex = startIndex + contributorsPerPage;
    const currentContributors = contributors.slice(startIndex, endIndex);

    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {currentContributors.map((contributor, index) => (
          <div
            key={contributor.login}
            className="bg-white m-2 p-8 rounded-lg shadow-md text-center cursor-pointer transform transition-transform duration-200 hover:scale-105"
            onClick={() => handleProfileClick(contributor.login)}
          >
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <div className="contributor-info">
              <h3 className="text-xl text-blue-600">{contributor.login}</h3>
              <p className="text-gray-700">{contributor.contributions} contributions</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const createPaginationButtons = () => {
    const totalPages = Math.ceil(contributors.length / contributorsPerPage);
    return Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`bg-blue-600 text-white py-4 px-5 m-1 rounded ${currentPage === index + 1 ? 'bg-blue-400' : ''} hover:bg-blue-800 transition-colors`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full min-h-screen shadow-md rounded-lg overflow-hidden p-10 sm:p-20 bg-gradient-to-r from-blue-500 to-blue-300">
        <header className="text-center mb-8">
          <h1 className="text-white text-5xl sm:text-6xl font-bold mb-4">Our Amazing Contributors</h1>
          <p className="text-white text-lg sm:text-xl mb-4">Meet the incredible people who make our project possible. Click on their profiles to learn more about their contributions.</p>
        </header>
        <div className="bg-white bg-opacity-80 p-6 rounded-lg mb-8 text-center">
          <h2 className="text-2xl text-blue-600 font-semibold">Thank You to All Our Contributors</h2>
          <p className="text-gray-700">Your hard work and dedication are truly appreciated!</p>
        </div>
        <div>
          {displayContributors()}
        </div>
        <div className="text-center mt-8">
          {createPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default Contribute;
