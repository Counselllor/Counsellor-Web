import './Dashboard.css'
import { NavLink } from 'react-router-dom'
import React, { useEffect, useState, useCallback} from 'react';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import collegesData from './colleges.json';
import ScrollToTop from "react-scroll-to-top";

import CollegeCard from './CollegeCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColleges, setFilteredColleges] = useState(collegesData);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        console.log("");
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const results = collegesData.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(results);
  }, [searchTerm]);


  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);
  return (
      <main>
      <ScrollToTop color='white' style={{backgroundColor:"#5CB6F9"}}/>
        <Navbar/>
        <div className="maintxt">
          <h1><span className="blue">Find your </span>Dream<br></br>College <span className='blue'>here!</span></h1>
          <p>For the Students, By the Students</p>
        </div>
        <div className="search">
          <div className="s_bar_c">
          <a href="">
  <img src="src/assets/icons8-search-50.png" />
</a>
            <div className="vl"></div>
            <input type="text" placeholder='Type college name or university name' 
            value={searchTerm}
            onChange={handleSearchChange}/>
          </div>
          <button>Search</button>
        </div>
        <div className="navigator">
          <span className='nearby'>Nearby</span>
          <span className='seeall'>See All</span>
        </div>
        <div className="colleges">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
        <Footer />
      </main>

  )
}

export default Dashboard