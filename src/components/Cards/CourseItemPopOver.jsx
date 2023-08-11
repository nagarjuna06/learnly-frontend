import styled from "@emotion/styled";
import { Tooltip, tooltipClasses } from "@mui/material";
import "./index.css";
import { CoursePoints } from "../FromElements";
import { dateFormat, timeToString } from "../../utils";
import CourseButtons from "../FromElements/CourseButtons";

const Info = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "#000",
    maxWidth: 300,
    padding: "1.3rem",
    boxShadow: "0px 4px 40px 0px #00000029",
    fontSize: "15px",
    fontWeight: 400,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#fff",
  },
}));

const CourseItemPopOver = ({ children, course }) => {
  const renderHighlights = () => {
    if (!course.highlights || course.highlights.length < 2) return null;

    const topHighlights = course.highlights.slice(0, 3);
    return (
      <div>
        {topHighlights.map((each, index) => (
          <CoursePoints key={index} point={each} />
        ))}
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="course-card-popup">
        <h3>{course?.title}</h3>
        <h5>
          Updated <span>{dateFormat(course?.updatedAt)}</span>
        </h5>
        <h4>
          {timeToString(course?.duration)}&nbsp;&#8226;&nbsp;{course?.level}
        </h4>
        <p>{course?.subtitle}</p>
        {renderHighlights()}
        <CourseButtons courseId={course?._id} slug={course?.slug} />
      </div>
    );
  };
  return (
    <Info
      title={renderInfo()}
      arrow
      interactive="true"
      placement="right"
      PopperProps={{
        popperOptions: {
          placement: "auto",
          modifiers: [
            {
              name: "flip",
              options: {
                fallbackPlacements: ["left", "right"],
              },
            },
          ],
        },
      }}
    >
      {children}
    </Info>
  );
};

export default CourseItemPopOver;
