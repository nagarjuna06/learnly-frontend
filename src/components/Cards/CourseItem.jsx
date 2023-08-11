/* eslint-disable react/prop-types */
import { Img } from "../FromElements";
import CustomRating from "../FromElements/CustomRating";
import Images from "../Images";
import "./index.css";
import CourseItemPopOver from "./CourseItemPopOver";
import { Link, useNavigate } from "react-router-dom";
import { dateFormat } from "../../utils";

const CourseItem = (props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/course/${props.slug}`);
  };
  if (props.myLearn) {
    return (
      <Link to={props.toLink}>
        <div className="course-card enroll">
          <div>
            <Img
              src={props.coverImage ? props.coverImage : Images.videoThumbnail}
            />
          </div>
          <h3>{props.title}</h3>
          <p>enrolledOn {dateFormat(props.enrolledOn)}</p>
        </div>
      </Link>
    );
  }
  return (
    <CourseItemPopOver course={props}>
      <div className="course-card" onClick={handleNavigate}>
        <div>
          <Img
            src={props.coverImage ? props.coverImage : Images.videoThumbnail}
          />
        </div>
        <h3>{props?.title}</h3>
        <p>{props?.postedBy?.name}</p>
        {!props.myLearn ? (
          <CustomRating
            value={props?.rating}
            no={props?.enrolledNo}
            readOnly
            size="small"
          />
        ) : null}
        <h3>{props?.pricing}</h3>
      </div>
    </CourseItemPopOver>
  );
};

export default CourseItem;
