import { useSelector, useDispatch } from "react-redux";
import Header from "../../../src/components/NavBar/Header";
import {
  AddButton,
  AlertMsg,
  Img,
  SaveButton,
} from "../../../src/components/FromElements";
import Images from "../../../src/components/Images";
import { useEffect } from "react";
import {
  createChapter,
  initializeCurriculum,
  noChanges,
  updateInstructorCourseById,
} from "../../../redux/slice/instructorSlice";
import EditableAccordion from "../../../src/components/Accordion/EditableAccordion";
import {
  addDurationToCurriculum,
  isAllChaptersFilled,
} from "../../../src/utils";
const Curriculum = () => {
  const dispatch = useDispatch();
  const curriculumLength = useSelector(
    (state) => state.instructor.curriculum.length
  );
  const { loading, success, curriculum, course } = useSelector(
    (state) => state.instructor
  );
  useEffect(() => {
    dispatch(initializeCurriculum());
  }, [dispatch]);
  const saveCurriculum = () => {
    if (!isAllChaptersFilled(curriculum)) {
      alert("Some contents are pending please fill it!");
      return;
    }
    if (success) {
      dispatch(noChanges());
    } else {
      dispatch(
        updateInstructorCourseById({
          courseId: course._id,
          body: addDurationToCurriculum(curriculum),
        })
      );
    }
  };
  return (
    <div>
      {curriculumLength ? (
        <div>
          <Header header="Curriculum">
            <SaveButton
              loading={loading}
              success={success}
              onClick={saveCurriculum}
            />
          </Header>
          <AlertMsg
            msg="Here's where you add course content—like lectures, course sections,
        assignments, and more. Click the button below to get started."
            type="info"
          />
          <EditableAccordion />
        </div>
      ) : (
        <div>
          <Header header="Curriculum">
            <AddButton
              onClick={() => dispatch(createChapter())}
              name="add chapter"
            />
          </Header>
          <div className="adjust-img">
            <Img src={Images.curriculum} alt="curriculum" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
