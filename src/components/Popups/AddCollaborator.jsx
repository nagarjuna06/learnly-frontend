import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddButton, Button, CustomInput } from "../FromElements";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  createCourseTeam,
  fetchInstructorDetail,
  getCourseTeam,
} from "../../../redux/slice/instructorSlice";
import CustomAvatarOnly from "../Avatar/CustomAvatar";
import CheckBoxes from "../FromElements/CheckBoxes";

const AddCollaborator = () => {
  const dispatch = useDispatch();
  const { fetchDetails, loading, profile, course } = useSelector(
    (state) => state.instructor
  );
  const { control, handleSubmit, setError } = useForm();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onsubmit = async (data) => {
    data.course = course._id;
    const result = await dispatch(fetchInstructorDetail(data));
    if ("error" in result) {
      setError("learnlyId", { type: "server", message: result.payload.msg });
    }
  };
  const handleCheckBoxSubmit = async (access) => {
    const body = {
      name: fetchDetails.name,
      instructor: fetchDetails._id,
      course: course._id,
      recipient: fetchDetails.email,
      title: course.title,
      coverImage: course.coverImage,
      senderName: profile.name,
      senderEmail: profile.email,
      access,
    };
    await dispatch(createCourseTeam(body));
    setOpen(false);
    await dispatch(getCourseTeam(course._id));
  };
  return (
    <div>
      <AddButton onClick={handleOpen} name="add instructor" />
      <Dialog className="dialog" open={open} onClose={handleClose}>
        <DialogContent>
          {fetchDetails ? (
            <div>
              <div className="fetch-profile">
                <CustomAvatarOnly
                  src={fetchDetails.avatar}
                  alt={fetchDetails.name}
                  size={120}
                />
                <div>
                  <p>{fetchDetails.name}</p>
                  <h3>{fetchDetails?.headline}</h3>
                  <p>{fetchDetails.email}</p>
                </div>
              </div>
              <CheckBoxes
                className="checkbox-form"
                onSubmit={handleCheckBoxSubmit}
              >
                <Button value="grant permission" type="submit" />
              </CheckBoxes>
            </div>
          ) : (
            <form
              autoComplete="off"
              className="create-course-form"
              onSubmit={handleSubmit(onsubmit)}
            >
              <Controller
                name="learnlyId"
                control={control}
                defaultValue=""
                rules={{
                  required: "Learnly Id is required Field",
                  pattern: {
                    value: /^Learnly_\d{6}$/,
                    message: "Id must be like 'Learnly_XXXXXX'",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <CustomInput
                    label="Learnly Id"
                    placeholder="Learnly_XXXXXX"
                    type="search"
                    error={!!error}
                    helperText={error ? error.message : null}
                    {...field}
                  />
                )}
              />
              <Button
                value="Fetch Instructor Details"
                type="submit"
                loading={loading}
              />
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCollaborator;
