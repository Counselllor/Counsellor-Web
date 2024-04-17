import React, { useEffect, useState } from "react";
import CounsellorDashboardNavBar from "../../components/CounsellorDashboardNavBar/CounsellorDashboardNavBar";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { get, ref } from "firebase/database";
import { auth, database } from "../../firebase/auth";
import CollegeDetail from "../../components/CollegeDetail/CollegeDetail";

const CounsellorDashboard = () => {
  const [collegeData, setCollegeData] = React.useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
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
        setId(user.uid);
        if (userData["user_type"] !== "counsellor") {
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
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main>
        <CounsellorDashboardNavBar />
        <div className="maintxt">
          <h1>
            <span className="blue">Counsellor Dashboard</span>
          </h1>
        </div>
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
    </>
  );
};

export default CounsellorDashboard;
