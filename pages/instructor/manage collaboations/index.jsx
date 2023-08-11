import { Outlet, useNavigate, useParams } from "react-router-dom";
import MiniDrawer from "../../../src/components/MenuBarLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { instructorCourseById } from "../../../redux/slice/instructorSlice";
import CircleLoading from "../../../src/components/Loading/Circle";

const CollaborationManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector((state) => state.instructor.course);
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
    if (result.error) {
      navigate("/instructor/collaborate");
    }
  };
  return (
    <MiniDrawer menuType="co">
      <div className="menu-content">
        {!!course && courseLoaded ? <Outlet /> : <CircleLoading />}
      </div>
    </MiniDrawer>
  );
};

export default CollaborationManage;
