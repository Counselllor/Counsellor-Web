import React, { useEffect, useState, useCallback } from "react";
import "./Contribute.css"; // Import CSS file for styles
import Footer from "../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "react-scroll-to-top";


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
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        if (!response.ok) {
          console.error('Failed to fetch contributors:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log(data)
        setContributors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    };

    fetchContributors();
  }, [owner, repo]);
let arr=[
  {
    "username": "thestarsahil",
    "country": "Default Country",
    "social_links": "https://thestarsahil.me/",
    "college_name": "Echelon Institute of Technology",
    "working_profile": "Default Working Profile",
    "batch_year": "2021 - 2024 "
  },
  {
    "username": "dependabot[bot]",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Default College",
    "working_profile": "Default Working Profile",
    "batch_year": "Default Batch Year"
  },
  {
    "username": "Ayushmaanagarwal1211",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Moradabad Institute of Technology",
    "working_profile": "Default Working Profile",
    "batch_year": "2021 - 2025"
  },
  {
    "username": "dhruv8433",
    "country": "Default Country",
    "social_links": "https://www.instagram.com/dhruv_s_o_n_i_/",
    "college_name": "Default College",
    "working_profile": "Default Working Profile",
    "batch_year": "Default Batch Year"
  },
  {
    "username": "nishant0708",
    "country": "Default Country",
    "social_links": "https://www.instagram.com/nishant0760/",
    "college_name": "International Institute of Professional Studies, IIPS, DAVV, Indore",
    "working_profile": "Default Working Profile",
    "batch_year": "2021-2026"
  },
  {
    "username": "ajshrmaofficial",
    "country": "Default Country",
    "social_links": "https://twitter.com/ajayshrma_",
    "college_name": "Echelon Institute of Technology",
    "working_profile": "Default Working Profile",
    "batch_year": "2021-2025"
  },
  {
    "username": "komal-agarwal5",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Techno Main - Salt Lake",
    "working_profile": "Default Working Profile",
    "batch_year": "2022-2026"
  },
  {
    "username": "MastanSayyad",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Dr. Babasaheb Ambedkar Technological University",
    "working_profile": "Default Working Profile",
    "batch_year": "2020 - 2024"
  },
  {
    "username": "ayush-848",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "National Institute of Technology Agartala",
    "working_profile": "Default Working Profile",
    "batch_year": "2022 - 2026"
  },
  {
    "username": "Hemashree21",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Default College",
    "working_profile": "Default Working Profile",
    "batch_year": "Default Batch Year"
  },
  {
    "username": "AlfiyaSiddique",
    "country": "Default Country",
    "social_links": "https://twitter.com/A_l_f_i_y_a",
    "college_name": "Default College",
    "working_profile": "Default Working Profile",
    "batch_year": "Default Batch Year"
  },
  {
    "username": "sau-mili",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "JadavPur University",
    "working_profile": "Default Working Profile",
    "batch_year": "2023- 2027"
  },
  {
    "username": "Hrishita-Paul",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "National Institute of Technology Silchar",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },
  {
    "username": "Asmita Mishra",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Lakshmi Narain College of Technology",
    "working_profile": "Default Working Profile",
    "batch_year": "2022- 2026"
  },
  {
    "username": "Amruta7203",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Pimpri Chinchwad Education Trust'S. Pimpri Chinchwad College Of Engineering",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },
  {
    "username": "Damini2004",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Priyadarshini JL College of Engineering ",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },{
    "username": "JiyaGupta-cs",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "National Institute of Technology Silchar",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },{
    "username": "hereisSwapnil",
    "country": "Default Country",
    "social_links": "https://twitter.com/hereisSwapnil",
    "college_name": "JSS ACADEMY OF TECHNICAL EDUCATION, NOIDA",
    "working_profile": "Default Working Profile",
    "batch_year": "2022 - 2026"
  },{
    "username": "Ratangulati",
    "country": "Default Country",
    "social_links": "https://twitter.com/ratanstwt",
    "college_name": "National Institute of Technology Silchar",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },{
    "username": "abhi03ruchi",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Himachal Pradesh University (HPU)",
    "working_profile": "Default Working Profile",
    "batch_year": "2020- 2022"
  },{
    "username": "RadhikaMalpani1702",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Dr. Babasaheb Ambedkar Technological University",
    "working_profile": "Default Working Profile",
    "batch_year": "2020 - 2024"
  },{
    "username": "Soumyajit2825",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Academy of Technology",
    "working_profile": "Default Working Profile",
    "batch_year": "2023 - 2024"
  },{
    "username": "SubhamB2003",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Supreme Knowledge Foundation",
    "working_profile": "Default Working Profile",
    "batch_year": "2020 - 2024"
  },{
    "username": "sivaprasath2004",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "National Institute of Technology Silchar",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },{
    "username": "PranjaliBhardwaj",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Guru Gobind Singh Indraprastha University",
    "working_profile": "Default Working Profile",
    "batch_year": "2022 - 2026"
  },{
    "username": "arcVaishali",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "GL Bajaj Institute of Technology and Management",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },{
    "username": "VGandhi27",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Echelon Institute of Technology",
    "working_profile": "Default Working Profile",
    "batch_year": "2020 - 2024"
  },{
    "username": "Geeta259",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "NITRR",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },{
    "username": "Asymtode712",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "Pimpri Chinchwad Education Trust'S. Pimpri Chinchwad College Of Engineering",
    "working_profile": "Default Working Profile",
    "batch_year": "2021- 2025"
  },{
    "username": "sumitkr2000",
    "country": "Default Country",
    "social_links": "Default Social Links",
    "college_name": "IPS Academy Indore",
    "working_profile": "Default Working Profile",
    "batch_year": "2019- 2023"
  },
]

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
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleProfileClick(contributor.login)}
      >
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div className="contributor-info">
          <h3>{contributor.login}</h3>
          <p>{contributor.contributions} contributions</p>
          {arr.find(item => item.username === contributor.login)?.college_name !== "Default College" && (
            <p>{arr.find(item => item.username === contributor.login)?.college_name}</p>
          )}
          {arr.find(item => item.username === contributor.login)?.batch_year !== "Default Batch Year" && (
            <p>{arr.find(item => item.username === contributor.login)?.batch_year}</p>
          )}
          <p>India</p>
        </div>
      </div>
    ));
  };

  const displayContributors = () => {
    return contributors.slice(0, contributors.length).map((contributor,index) => (
      <div
        key={contributor.login}
        className="contributor-card"
        onClick={() => handleProfileClick(contributor.login)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleProfileClick(contributor.login)}
      >
        <img src={contributor.avatar_url} alt={contributor.login} />
        <div className="contributor-info">
          <h3>{contributor.login}</h3>
          <p>{contributor.contributions} contributions</p>
          {arr[index] && arr[index].username === contributor.login && arr[index].college_name && arr[index].college_name !== "Default College" && (
            <p>{arr[index].college_name}</p>
          )}
          {arr[index] && arr[index].username === contributor.login && arr[index].social_links && arr[index].social_links !== "Default Social Links" && (
            <p>{arr[index].social_links}</p>
          )}
          {arr[index] && arr[index].username === contributor.login && arr[index].batch_year && arr[index].batch_year !== "Default Batch Year" && (
            <p>{arr[index].batch_year}</p>
          )}
          <p>India</p>
        </div>
      </div>
    ));
  };

  const renderSkeletons = (count) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <div className="contributor-card skeleton" key={`skeleton-${index}`}>
          <div className="skeleton-avatar" />
          <div className="skeleton-info">
            <div className="skeleton-text skeleton-name" />
            <div className="skeleton-text skeleton-contributions" />
            <div className="skeleton-text" />
            <div className="skeleton-text" />
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
