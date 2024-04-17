import React, { useEffect, useState } from "react";
import { auth, database } from "../../firebase/auth";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "react-scroll-to-top";
import SearchBar from "../../components/SearchBar/SearchBar";
import StudentDashboardNavBar from "../../components/StudentDashboardNavBar/StudentDashboardNavBar";
import CollegesSection from "../../components/CollegesSection/CollegesSection";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import Loading from "../../components/Loading/Loading";
import { get, ref } from "firebase/database";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [collegeData, setCollegeData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  async function readAllColleges() {
    try {
      const collegesRef = ref(database, "colleges");
      const collegesSnapshot = await get(collegesRef);
      if (collegesSnapshot.exists()) {
        const collegesData_ = collegesSnapshot.val();
        setCollegeData(collegesData_); // Update state with collegesData_
        // console.log("All colleges data:", collegesData);
      } else {
        console.log("No colleges found.");
      }
    } catch (error) {
      console.error("Error reading colleges data:", error.message);
    }
  }
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        readAllColleges();
        setLoading(false);
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <>
      <main>
        <ScrollToTop
          color="white"
          smooth
          style={{ backgroundColor: "#5CB6F9" }}
        />
        <StudentDashboardNavBar />
        <div className="maintxt">
          <h1>
            <span className="blue">Find your </span>Dream<br></br>College{" "}
            <span className="blue">here!</span>
          </h1>
          <p>For the Students, By the Students</p>
        </div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="navigator">
          <span className="nearby link">Nearby</span>
          <span className="seeall link">See All</span>
        </div>
        {Object.values(collegeData).length > 0 && (
          <CollegesSection
            collegeData={collegeData}
            searchQuery={searchQuery}
          />
        )}
        <Footer />
      </main>
    </>
  );
};

export default StudentDashboard;
