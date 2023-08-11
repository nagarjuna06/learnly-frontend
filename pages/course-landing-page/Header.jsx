/* eslint-disable react/prop-types */
import CustomRating from "../../src/components/FromElements/CustomRating";
import "./index.css";
const Header = ({ title }) => {
  return (
    <div className="course-header">
      <h2>{title}</h2>
    </div>
  );
};

export default Header;
