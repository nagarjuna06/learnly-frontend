/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
const Description = ({ data = "" }) => {
  const [maxchars, setMaxChars] = useState(300);
  if (!data.length) {
    return;
  }
  const remain = data.length - maxchars;
  return (
    <div className="course-description">
      <h2>Description</h2>
      <div dangerouslySetInnerHTML={{ __html: data.slice(0, maxchars) }}></div>
      <div className="collapse-button show-less-more">
        {remain > 0 ? (
          <p onClick={() => setMaxChars(data.length)}>
            <span>Show more</span>
            <MdOutlineKeyboardArrowDown size={16} />
          </p>
        ) : null}

        {remain === 0 ? (
          <p onClick={() => setMaxChars(300)}>
            <span>Show less</span>
            <MdOutlineKeyboardArrowUp size={16} />
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Description;
