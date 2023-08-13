import { useDispatch, useSelector } from "react-redux";
import {
  AlertMsg,
  Button,
  CustomInput,
  CustomSwitch,
  SaveButton,
} from "../../../src/components/FromElements";
import Header from "../../../src/components/NavBar/Header";
import "../index.css";
import {
  changes,
  deleteInstructorCourseById,
  instructorCourses,
  noChanges,
  updateInstructorCourseById,
} from "../../../redux/slice/instructorSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  coursePublishRequire,
  durationString,
  projectMode,
} from "../../../src/utils";
import { Alert } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { course, loading, success } = useSelector((state) => state.instructor);
  const [errors, setErrors] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    const errorsList = coursePublishRequire(course);
    if (errorsList.length) {
      setErrors(errorsList);
    } else {
      const formData = Object.fromEntries(new FormData(e.target));
      const isPublish = "publish" in formData;
      const body = { publish: isPublish };
      if (course.publish !== isPublish && (!course.publish || projectMode)) {
        dispatch(updateInstructorCourseById({ courseId: course._id, body }));
      } else {
        dispatch(noChanges());
      }
    }
  };
  const onChange = () => {
    dispatch(changes());
  };
  const handleDelete = async () => {
    const confirmation = confirm(
      `Do you want delete this ${course.title} course?`
    );
    if (confirmation) {
      await dispatch(deleteInstructorCourseById({ courseId: course._id }));
      await navigate("/instructor/courses");
      dispatch(instructorCourses());
    }
  };
  return (
    <form className="instructor-course" onSubmit={onSubmit} onChange={onChange}>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <Header header="Settings">
        <SaveButton loading={loading} success={success} />
      </Header>
      <AlertMsg
        type="warning"
        msg="Once you publish the course, you cannot unpublish or delete it."
      />
      <div className="course-settings">
        <p>Total Course Duration:</p>
        <h3>{durationString(course?.duration)}</h3>
      </div>
      <div className="course-settings">
        <p>Course Status:</p>
        <div className="settings-publish">
          <p>Unpublished</p>
          <CustomSwitch
            name="publish"
            checked={course.publish}
            disabled={course.publish && !projectMode}
          />
          <p>Published</p>
        </div>
      </div>
      {!course.publish ? (
        <div className="course-settings">
          <p>Delete the Course:</p>
          <Button
            onClick={handleDelete}
            value="Delete"
            variant="outlined"
            color="error"
            loading={loading}
            startIcon={<MdDelete />}
          />
        </div>
      ) : null}
      {errors.length ? (
        <Alert severity="error" variant="standard">
          {errors.map((each, index) => (
            <p key={index}>{each}</p>
          ))}
        </Alert>
      ) : null}
    </form>
  );
};

export default Settings;
