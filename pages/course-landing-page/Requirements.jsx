/* eslint-disable react/prop-types */
import "./index.css";
const Requirements = ({ data = [], heading = "" }) => {
  if (!data.length) {
    return null;
  }
  return (
    <div className="course-requirements">
      <h2>{heading}</h2>
      <div>
        {data.map((each, index) => (
          <p key={index} className="course-points">
            <span style={{ fontSize: 22 }}>&#8226;</span>
            {each}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Requirements;
