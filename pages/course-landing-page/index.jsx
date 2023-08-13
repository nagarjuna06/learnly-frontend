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
import Images from "../../src/components/Images";
import { Helmet } from "react-helmet";
const CourseLandingPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { course, loading } = useSelector((state) => state.course);
  useEffect(() => {
    dispatch(getCourse(slug));
  }, []);
  return (
    <div className="course-landing-page">
      {loading ? (
        <CircleLoading />
      ) : (
        <div>
          <Helmet>
            <title>{course?.title}</title>
            <meta title={course?.title} />
            <meta property="og:title" content={course?.title} />
            <meta property="og:description" content={course?.subtitle} />
            <meta
              property="og:image"
              content={course?.coverImage || Images.videoThumbnail}
            />
            <meta property="og:url" content="https://learn-ly.netlify.app" />
          </Helmet>
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
