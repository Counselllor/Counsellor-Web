import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, database } from "../../firebase/auth";
import { get, ref } from "firebase/database";
import CollegeDetail from "../../components/CollegeDetail/CollegeDetail";
import CounsellorDashboardNavBar from "../../components/CounsellorDashboardNavBar/CounsellorDashboardNavBar";
import Footer from "../../components/Footer/Footer";
import StudentDashboardNavBar from "../../components/StudentDashboardNavBar/StudentDashboardNavBar";

const ViewCollege = () => {
  const { id } = useParams();
  const [collegeData, setCollegeData] = React.useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function readAllCollegeById() {
    try {
      const collegesRef = ref(database, "colleges/" + id);
      const collegesSnapshot = await get(collegesRef);
      if (collegesSnapshot.exists()) {
        const collegeData_ = collegesSnapshot.val();
        setCollegeData(collegeData_);
      } else {
        console.log("No colleges found.");
      }
    } catch (error) {
      console.error("Error reading colleges data:", error.message);
    }
  }
  async function readUserData(userId) {
    try {
      const snapshot = await get(ref(database, "users/" + userId));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error reading data:", error.message);
      return null;
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await readUserData(user.uid);
        if (userData["user_type"] !== "student") {
          setLoading(false);
          navigate("/dashboard");
        }
        setLoading(false);
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        readAllCollegeById();
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  console.log(collegeData);
  return (
    <main>
      <StudentDashboardNavBar />
      <div className="maintxt">
        <h1>
          <span className="blue" style={{ fontSize: "30px" }}>
            {collegeData?.collegeName}
          </span>
        </h1>
      </div>
      <CollegeDetail college={collegeData} />
      <Footer />
    </main>
  );
};

export default ViewCollege;
