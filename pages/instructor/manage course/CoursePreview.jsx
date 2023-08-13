import { useSelector } from "react-redux";
import CourseInfo from "../../course-landing-page/CourseInfo";
import Highlights from "../../course-landing-page/Highlights";
import CustomizedAccordions from "../../../src/components/Accordion";
import Requirements from "../../course-landing-page/Requirements";
import Description from "../../course-landing-page/Description";
import { Helmet } from "react-helmet";

const CoursePreview = () => {
  const { course } = useSelector((state) => state.instructor);
  return (
    <div>
      <Helmet>
        <title>Course preview</title>
      </Helmet>
      <CourseInfo {...course} />
      <div className="course-body">
        <Highlights data={course?.highlights} />
        <CustomizedAccordions
          curriculum={course?.curriculum}
          duration={course?.duration}
        />
        <Requirements heading="Requirements" data={course?.prerequisites} />
        <Description data={course?.description} />
        <Requirements
          heading="Who this course is for:"
          data={course?.targetStudents}
        />
      </div>
    </div>
  );
};

export default CoursePreview;
