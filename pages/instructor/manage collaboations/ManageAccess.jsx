import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import CourseDetails from "../manage course/CourseDetails";
import Intended from "../manage course/Intended";
import Curriculum from "../manage course/Curriculum";
import { getCoursesByTeam } from "../../../redux/slice/instructorSlice";

const ManageAccess = () => {
  const dispatch = useDispatch();
  const { access, error } = useSelector((state) => state.instructor);
  const { courseId, accessId } = useParams();
  const link = `/instructor/collaborate/${courseId}/${access[0]}`;
  if (error) {
    dispatch(getCoursesByTeam());
    return <Navigate to="/instructor/collaborate" />;
  }
  switch (accessId) {
    case "details":
      return access.includes(accessId) ? (
        <CourseDetails />
      ) : (
        <Navigate to={link} />
      );

    case "intended":
      return access.includes(accessId) ? <Intended /> : <Navigate to={link} />;

    case "curriculum":
      return access.includes(accessId) ? (
        <Curriculum />
      ) : (
        <Navigate to={link} />
      );

    default:
      return <Navigate to={link} />;
  }
};

export default ManageAccess;
