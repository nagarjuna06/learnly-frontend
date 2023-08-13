/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import CircleLoading from "../../../src/components/Loading/Circle";
import AddCourse from "../../../src/components/Popups/AddCourse";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { instructorCourses } from "../../../redux/slice/instructorSlice";
import { Img } from "../../../src/components/FromElements";
import Images from "../../../src/components/Images";
import InstructorCourseCard from "../../../src/components/Cards/InstructorCourseCard";
import Header from "../../../src/components/NavBar/Header";
import { Helmet } from "react-helmet";
const InstructorCourses = () => {
  const dispatch = useDispatch();
  const { loading, courses, profile } = useSelector(
    (state) => state.instructor
  );
  useEffect(() => {
    if (profile?.postedCourses.length) {
      dispatch(instructorCourses());
    }
  }, []);
  return (
    <div className="menu-content">
      <Helmet>
        <title>Instructor courses</title>
      </Helmet>
      <Header header="Courses">
        <AddCourse />
      </Header>
      {loading ? (
        <CircleLoading />
      ) : (
        <div>
          {courses.length ? (
            <div className="instructor-course-card-container">
              {courses.map((item) => (
                <InstructorCourseCard
                  key={item._id}
                  {...item}
                  courseId={item._id}
                  toLink={`/instructor/courses/${item._id}/details`}
                />
              ))}
            </div>
          ) : (
            <div className="adjust-img">
              <Img src={Images.instructorCourses} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
