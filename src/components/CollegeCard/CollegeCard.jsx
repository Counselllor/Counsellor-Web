import { useNavigate } from "react-router-dom";
import "./CollegeCard.css";

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="college"
        onClick={() => {
          navigate("/college/" + college.id);
        }}
      >
        <div className="up">
          <img src={college.imageUrl} alt="College Logo" />
          <div className="context">
            <p>{college.collegeName}</p>
            <span>{college.collegeLocation}</span>
          </div>
        </div>
        <div className="down">
          <div className="ctc">Hightest CTC - {college.highestPackage} LPA</div>
          <div className="time">3 mins ago</div>
        </div>
      </div>
    </>
  );
};

export default CollegeCard;
