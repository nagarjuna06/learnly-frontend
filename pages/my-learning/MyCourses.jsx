import CourseItem from "../../src/components/Cards/CourseItem";
import { Img } from "../../src/components/FromElements";
import Images from "../../src/components/Images";
import CircleLoading from "../../src/components/Loading/Circle";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { useEffect } from "react";
import { myLearning } from "../../redux/slice/authSlice";
const MyCourses = () => {
  const dispatch = useDispatch();
  const { loading, profile, enrolledCourses } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (profile?.enrolledCourses.length) {
      dispatch(myLearning());
    }
  }, [profile]);
  return (
    <div className="wishlist my-learning">
      {loading ? (
        <CircleLoading />
      ) : (
        <>
          <h1>My Courses</h1>
          {profile?.enrolledCourses.length ? (
            <div className="course-wishlist">
              {enrolledCourses.map((each, index) => (
                <CourseItem
                  key={index}
                  {...each.course}
                  enrolledOn={each.enrolledOn}
                  myLearn
                  toLink={`/user/learning/${each.course.slug}?enroll=${each._id}`}
                />
              ))}
            </div>
          ) : (
            <div className="user-img">
              <Img src={Images.enrolledCourses} alt="wishlist" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyCourses;
