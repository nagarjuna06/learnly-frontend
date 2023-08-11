import { Outlet, useNavigate, useParams } from "react-router-dom";
import MiniDrawer from "../../../src/components/MenuBarLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseTeam,
  instructorCourseById,
} from "../../../redux/slice/instructorSlice";
import CircleLoading from "../../../src/components/Loading/Circle";
const CourseManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course, role } = useSelector((state) => state.instructor);
  const { courseId } = useParams();
  const [courseLoaded, setCourseLoaded] = useState(false);
  useEffect(() => {
    if (course) {
      setTimeout(() => {
        setCourseLoaded(true);
      }, 100);
    }
  }, [course]);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const result = await dispatch(instructorCourseById(courseId));
    if (result.payload) {
      if (result.payload?.role === "owner") {
        dispatch(getCourseTeam(courseId));
      } else {
        navigate("/instructor", { replace: true });
      }
    }
  };

  return (
    <MiniDrawer menuType="c">
      <div className="menu-content">
        {!!course && courseLoaded && role === "owner" ? (
          <Outlet />
        ) : (
          <CircleLoading />
        )}
      </div>
    </MiniDrawer>
  );
};

export default CourseManage;
