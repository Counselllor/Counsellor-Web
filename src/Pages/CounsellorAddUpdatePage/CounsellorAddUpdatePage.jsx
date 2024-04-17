import React, { useEffect, useState } from "react";
import { auth, database } from "../../firebase/auth";
import Footer from "../../components/Footer/Footer";
import CounsellorDashboardNavBar from "../../components/CounsellorDashboardNavBar/CounsellorDashboardNavBar";
import { useNavigate } from "react-router-dom";
import ListNewCollege from "../ListNewCollege/ListNewCollege";
import { get, ref } from "firebase/database";
import Loading from "../../components/Loading/Loading";

const CounsellorAddUpdatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <main>
        <CounsellorDashboardNavBar />
        <div className="maintxt">
          <h1>
            <span className="blue">Add New/Update College</span>
          </h1>
        </div>
        <ListNewCollege />
        <Footer />
      </main>
    </>
  );
};

export default CounsellorAddUpdatePage;
