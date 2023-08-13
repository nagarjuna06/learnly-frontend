/* eslint-disable no-unused-vars */
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { AddButton, AlertMsg, Button, CustomInput } from "../FromElements";
import { useState } from "react";
import DropDownInput from "../FromElements/DropDownInput";
import categories from "../../utils/categories";
import { useDispatch, useSelector } from "react-redux";
import {
  instructorCourses,
  instructorCreateCourse,
} from "../../../redux/slice/instructorSlice";
import { Controller, useForm } from "react-hook-form";

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const {
    createCourse: { loading, error },
    msg,
  } = useSelector((state) => state.instructor);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    let formData = data;
    formData.slug = data.title.replaceAll(" ", "-").toLowerCase();
    const res = await dispatch(instructorCreateCourse(formData));
    if (res.meta.requestStatus === "fulfilled") {
      setOpen(false);
      dispatch(instructorCourses());
    }
  };
  return (
    <div>
      <AddButton onClick={handleOpen} name="add course" />
      <Dialog fullWidth open={open} className="dialog" onClose={handleClose}>
        <DialogContent>
          {error ? <AlertMsg type="error" msg={msg} /> : null}
          <form
            className="create-course-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Title is required Field",
                minLength: {
                  value: 5,
                  message: "title at least have 5 characters",
                },
                pattern: {
                  value: /^(?!.*[./=?]).{3,100}$/,
                  message: ". / ? = not allowed",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  label="Course Title"
                  name="title"
                  {...field}
                  inputProps={{ maxLength: 100 }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              rules={{
                required: "Category is required Field",
              }}
              render={({ field, fieldState: { error } }) => (
                <DropDownInput
                  label="Category"
                  name="category"
                  data={categories}
                  valueExtractor={(item) => item.title}
                  labelExtractor={(item) => item.title}
                  {...field}
                  required
                />
              )}
            />
            <DialogActions>
              <div className="dialog-actions">
                <Button
                  value="cancel"
                  variant="outlined"
                  size="normal"
                  type="reset"
                  disabled={loading}
                  onClick={handleClose}
                />
                <Button
                  value="create"
                  size="normal"
                  type="submit"
                  loading={loading}
                />
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCourse;
