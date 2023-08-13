import { useDispatch, useSelector } from "react-redux";
import Header from "../../../src/components/NavBar/Header";
import { CustomInput, SaveButton } from "../../../src/components/FromElements";
import "../index.css";
import TextEditor from "../../../src/components/TextEditor";
import languages from "../../../src/utils/languages";
import categories from "../../../src/utils/categories";
import DropDownInput from "../../../src/components/FromElements/DropDownInput";
import { useState } from "react";
import { getSubCategory } from "../../../src/utils";
import {
  changes,
  instructorCourses,
  updateInstructorCourseById,
} from "../../../redux/slice/instructorSlice";
import UploadCourseCover from "../../../src/components/Avatar/UploadCourseCover";
import { Helmet } from "react-helmet";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { course, success, loading } = useSelector((state) => state.instructor);
  const [category, setCategory] = useState(course.category);
  const handleChanges = () => {
    dispatch(changes());
  };
  const handleOnChange = (e) => {
    setCategory(e.target.value);
    handleChanges();
  };
  const dropDownInputs = [
    {
      label: "Language",
      name: "language",
      data: languages,
      valueExtractor: (item) => item.name,
      labelExtractor: (item) => item.nativeName,
      onChange: handleChanges,
    },
    {
      label: "Level",
      name: "level",
      data: ["Beginner", "Intermediate", "Expert", "All Levels"],
      valueExtractor: (item) => item,
      labelExtractor: (item) => item,
      onChange: handleChanges,
    },
    {
      label: "Category",
      name: "category",
      data: categories,
      valueExtractor: (item) => item.title,
      labelExtractor: (item) => item.title,
      onChange: handleOnChange,
    },
    {
      label: "Sub Category",
      name: "subCategory",
      data: getSubCategory(category),
      valueExtractor: (item) => item.title,
      labelExtractor: (item) => item.title,
      onChange: handleChanges,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const imageHave = formObj.course_cover_image.name === "";
    if (imageHave) {
      formData.delete("course_cover_image");
    }
    const res = await dispatch(
      updateInstructorCourseById({ courseId: course._id, body: formData })
    );
    if (res.meta.requestStatus === "fulfilled" && !imageHave) {
      await dispatch(instructorCourses());
    }
  };

  return (
    <form
      className="instructor-course"
      onChange={handleChanges}
      onSubmit={handleSubmit}
    >
      <Helmet>
        <title>Course details</title>
      </Helmet>
      <Header header="Course Details">
        <SaveButton loading={loading} success={success} />
      </Header>
      <div className="instructor-course-sub">
        <div>
          <CustomInput
            label="Title"
            name="title"
            disabled
            value={course.title}
          />
          <CustomInput
            label="Subtitle"
            name="subtitle"
            placeholder="Subtitle"
            required
            value={course?.subtitle}
          />
          <TextEditor
            name="description"
            label="Description*"
            value={course?.description}
            required
          />
        </div>
        <UploadCourseCover name="course_cover_image" src={course?.coverImage} />
      </div>
      <div className="drop-down-container">
        {dropDownInputs.map((item, index) => (
          <DropDownInput
            key={index}
            {...item}
            value={course?.[item.name]}
            required
          />
        ))}
      </div>
      <CustomInput
        label="Promotional Video URL"
        placeholder="https://youtu.be/f55qeKGgB_M"
        name="previewMedia"
        value={course?.previewMedia}
        required
      />
    </form>
  );
};

export default CourseDetails;
