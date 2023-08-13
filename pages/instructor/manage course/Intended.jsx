import { useDispatch, useSelector } from "react-redux";
import { AlertMsg, SaveButton } from "../../../src/components/FromElements";
import Header from "../../../src/components/NavBar/Header";
import "../index.css";
import { useFieldArray, useForm } from "react-hook-form";
import DeleteInputs from "../../../src/components/FromElements/DeleteInput";
import {
  changes,
  noChanges,
  updateInstructorCourseById,
} from "../../../redux/slice/instructorSlice";
import { convertToPoints } from "../../../src/utils";
import { Helmet } from "react-helmet";

const Intended = () => {
  const dispatch = useDispatch();
  const { course, loading, success } = useSelector((state) => state.instructor);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      intended: {
        highlights: convertToPoints(course.highlights),
        prerequisites: convertToPoints(course.prerequisites),
        targetStudents: convertToPoints(course.targetStudents),
      },
    },
  });

  const {
    fields: highlightFields,
    append: highlightAppend,
    remove: highlightRemove,
    move: highlightMove,
  } = useFieldArray({ control, name: "intended.highlights" });

  const {
    fields: prerequisiteFields,
    append: prerequisiteAppend,
    remove: prerequisiteRemove,
    move: prerequisiteMove,
  } = useFieldArray({ control, name: "intended.prerequisites" });

  const {
    fields: targetStudentsFields,
    append: targetStudentsAppend,
    remove: targetStudentsRemove,
    move: targetStudentsMove,
  } = useFieldArray({ control, name: "intended.targetStudents" });
  const onsubmit = (formData) => {
    const { intended } = formData;
    const highlights = intended.highlights.map((each) => each.points);
    const prerequisites = intended.prerequisites.map((each) => each.points);
    const targetStudents = intended.targetStudents.map((each) => each.points);
    const body = { highlights, prerequisites, targetStudents };
    if (success) {
      dispatch(noChanges());
    } else {
      dispatch(updateInstructorCourseById({ courseId: course._id, body }));
    }
  };
  const onchange = () => {
    dispatch(changes());
  };
  return (
    <form
      className="instructor-course"
      onSubmit={handleSubmit(onsubmit)}
      onChange={onchange}
    >
      <Helmet>
        <title>Intended Learners</title>
      </Helmet>
      <Header header="Intended Learners">
        <SaveButton loading={loading} success={success} />
      </Header>
      <AlertMsg
        type="info"
        msg="The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them."
      />
      <div>
        <h3>What will students learn in your course?</h3>
        <p>
          You must enter at least 4 learning objectives or outcomes that
          learners can expect to achieve after completing your course.
        </p>
        <DeleteInputs
          name="highlights"
          Fields={highlightFields}
          control={control}
          handleAppend={highlightAppend}
          handleRemove={highlightRemove}
          handleMove={highlightMove}
          placeholder="Example: Define the roles and responsibilities of a project manager"
          maximumFields={20}
        />
      </div>
      <div>
        <h3>
          What are the requirements or prerequisites for taking your course?
        </h3>
        <p>
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course.
          <br />
          If there are no requirements, use this space as an opportunity to
          lower the barrier for beginners.
        </p>
        <DeleteInputs
          name="prerequisites"
          Fields={prerequisiteFields}
          control={control}
          handleAppend={prerequisiteAppend}
          handleRemove={prerequisiteRemove}
          handleMove={prerequisiteMove}
          placeholder="Example: No programming experience needed. You will learn everything you need to know"
          maximumFields={20}
        />
      </div>
      <div>
        <h3>Who is this course for?</h3>
        <p>
          Write a clear description of the intended learners for your course who
          will find your course content valuable.
          <br />
          This will help you attract the right learners to your course.
        </p>
        <DeleteInputs
          name="targetStudents"
          Fields={targetStudentsFields}
          control={control}
          handleAppend={targetStudentsAppend}
          handleRemove={targetStudentsRemove}
          handleMove={targetStudentsMove}
          placeholder="Example: Beginner Python developers curious about data science"
          maximumFields={20}
        />
      </div>
    </form>
  );
};

export default Intended;
