import { useDispatch } from "react-redux";
import VideoPlayer from "./index";
import { incProgress } from "../../../redux/slice/authSlice";

const CoursePlayer = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="course-player">
      <VideoPlayer
        url={props.url}
        thumbnail={props?.coverImage}
        handleOnEnded={() => dispatch(incProgress())}
      />
      <h2>{props.contentTitle}</h2>
      <h3>{props.chapterTitle}</h3>
    </div>
  );
};

export default CoursePlayer;
