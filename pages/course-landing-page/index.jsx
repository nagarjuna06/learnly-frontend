/* eslint-disable no-unused-vars */
import CircleLoading from "../../src/components/Loading/Circle";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../../redux/slice/courseSlice";
import Header from "./Header";
import CourseInfo, { RenderIncludes } from "./CourseInfo";
import Highlights from "./Highlights";
import CustomizedAccordions from "../../src/components/Accordion";
import Requirements from "./Requirements";
import { timeToString } from "../../src/utils";
import Description from "./Description";
import InstructorInfo from "./InstructorInfo";
import Reviews from "./Reviews";
import { setOg } from "../../redux/slice/ogSlice";

const CourseLandingPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { course, loading } = useSelector((state) => state.course);
  useEffect(() => {
    dispatch(getCourse(slug));
    return () => {
      document.title = "Learnly";
    };
  }, []);
  useEffect(() => {
    if (course) {
      dispatch(
        setOg({
          title: course?.title,
          description: course?.subtitle,
          image: course?.coverImage,
        })
      );
    }
  }, [course]);
  document.title = course?.title;
  return (
    <div className="course-landing-page">
      {loading ? (
        <CircleLoading />
      ) : (
        <div>
          <Header title={course?.title} />
          <CourseInfo {...course} />
          <div className="course-body">
            <Highlights data={course.highlights} />
            <RenderIncludes
              className="includes-s"
              hrs={timeToString(course.duration)}
            />
            <CustomizedAccordions
              curriculum={course?.curriculum}
              duration={course?.duration}
              viewOnly
            />
            <Requirements heading="Requirements" data={course?.prerequisites} />
            <Description data={course?.description} />
            <Requirements
              heading="Who this course is for:"
              data={course?.targetStudents}
            />
            <InstructorInfo data={course?.postedBy} />
            <Reviews reviews={course?.reviews} rating={course?.rating} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLandingPage;
