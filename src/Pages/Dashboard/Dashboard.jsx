import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/auth";
import { get, ref } from "firebase/database";
import { database } from "../../firebase/auth";

import StudentDashboard from "../StudentDashboard/StudentDashboard";
import Loading from "../../components/Loading/Loading";
import CounsellorDashboard from "../CounsellorDashboard/CounsellorDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user_, setUser_] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        setUser_(userData);
        setLoading(false);
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  if (loading) {
    <Loading />;
  }

  if (user_ && user_["user_type"] == "counsellor") {
    return <CounsellorDashboard />;
  } else if (user_ && user_["user_type"] == "student") {
    return <StudentDashboard />;
  } else {
    <Loading />;
  }
};

export default Dashboard;
