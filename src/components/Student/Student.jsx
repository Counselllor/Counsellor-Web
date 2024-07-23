import React from "react";
import StudentLayout from "./StudentLayout";
import { useParams } from "react-router-dom";
import Achievements from "./Achievements";
import TechStack from "./TechStack";

const Student = () => {
  const { title } = useParams();
  console.log("Params", title);
  return (
    <StudentLayout>
      {/* ahceivements page route /acheivements */}
      {title == "achievements" && <Achievements />}
      {title == "tech-stack" && <TechStack />}
    </StudentLayout>
  );
};

export default Student;
