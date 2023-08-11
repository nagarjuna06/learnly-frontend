/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { CoursePoints } from "../../src/components/FromElements";
import "./index.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const Highlights = ({ data = [] }) => {
  const [maxHighlights, setMaxHighlights] = useState(4);
  if (!data.length) {
    return null;
  }
  const remain = data.length - maxHighlights;
  return (
    <div className="course-highlights">
      <h2>What you'll learn</h2>
      <div>
        {data.slice(0, maxHighlights).map((each, index) => (
          <CoursePoints key={index} point={each} />
        ))}
      </div>
      <div className="collapse-button show-less-more">
        {remain > 0 ? (
          <p onClick={() => setMaxHighlights(data.length)}>
            <MdOutlineKeyboardArrowDown size={20} />
            show more{" "}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Highlights;
