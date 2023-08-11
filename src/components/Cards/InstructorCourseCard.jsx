import { Link } from "react-router-dom";
import { timeDiff } from "../../utils";
import { Img } from "../FromElements";
import Images from "../Images";
import "./index.css";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { noChanges, setAccess } from "../../../redux/slice/instructorSlice";

const InstructorCourseCard = ({
  title,
  category,
  coverImage,
  updatedAt,
  toLink,
  access = null,
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(noChanges());
    if (access) {
      dispatch(setAccess(access));
    }
  };

  return (
    <Link to={toLink} onClick={handleClick}>
      <Tooltip title={`Edit/Manage ${title} course `} followCursor>
        <div className="instructor-course-card-main">
          <div className="instructor-course-card">
            <Img src={coverImage ? coverImage : Images.courseCover} />
            <p>{title}</p>
            <p>{category}</p>
            <p className="created-time">last updated: {timeDiff(updatedAt)}</p>
          </div>
        </div>
      </Tooltip>
    </Link>
  );
};

export default InstructorCourseCard;
