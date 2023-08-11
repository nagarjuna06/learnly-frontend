import { useEffect } from "react";
import { AddButton, Img } from "../../../src/components/FromElements";
import Header from "../../../src/components/NavBar/Header";
import { useSelector, useDispatch } from "react-redux";
import { getCoursesByTeam } from "../../../redux/slice/instructorSlice";
import InstructorCourseCard from "../../../src/components/Cards/InstructorCourseCard";
import CircleLoading from "../../../src/components/Loading/Circle";
import Images from "../../../src/components/Images";
const CollaboratedCourses = () => {
  const dispatch = useDispatch();
  const { collaboratedCourses, loading, profile } = useSelector(
    (state) => state.instructor
  );
  useEffect(() => {
    if (profile?.collaboratedCourses?.length) {
      dispatch(getCoursesByTeam());
    }
  }, []);

  const handleRefresh = () => {
    dispatch(getCoursesByTeam());
  };

  return (
    <div className="menu-content">
      <>
        {loading ? (
          <CircleLoading />
        ) : (
          <>
            <Header header="Collaborated Courses">
              <AddButton
                icon="refresh"
                name="refresh"
                onClick={handleRefresh}
              />
            </Header>
            {collaboratedCourses.length ? (
              <div className="instructor-course-card-container">
                {collaboratedCourses.map((item) => (
                  <InstructorCourseCard
                    key={item._id}
                    courseId={item.course._id}
                    {...item.course}
                    access={item.access}
                    toLink={`/instructor/collaborate/${item.course._id}/${item.access[0]}`}
                  />
                ))}
              </div>
            ) : (
              <div className="adjust-img">
                <Img
                  src={Images.collaboratedCourses}
                  alt="collaborated-courses"
                />
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default CollaboratedCourses;
