import React from "react";
import StudentLayout from "./StudentLayout";
import { useParams } from "react-router-dom";
import Achievements from "./Achievements";

const Student = () => {
  const { title } = useParams();
  console.log("Params", title);
  return (
    <StudentLayout>
      {/* ahceivements page route /acheivements */}
      {title == "achievements" && <Achievements />}
    </StudentLayout>
  );
};

export default Student;
