/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import { CustomInput } from "./index";
import { MdOutlineClose, MdOutlineSave } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";

const ChapterForm = ({ value = "", onSubmit, close, setEdit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      chapterTitle: value,
    },
  });
  const onsubmit = (data) => {
    onSubmit(data.chapterTitle);
  };
  const handleClose = () => {
    if (!!value) {
      setEdit(false);
    } else {
      close();
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="chapter-form">
      <Controller
        name="chapterTitle"
        control={control}
        defaultValue={value}
        rules={{
          required: "Chapter Title is required field",
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomInput
            name="chapterTitle"
            type="text"
            label="Chapter Title"
            fullWidth
            size="small"
            {...field}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <div className="chapter-form-btn">
        <IconButton type="submit">
          <MdOutlineSave />
        </IconButton>
        <IconButton type="button" onClick={handleClose}>
          <MdOutlineClose />
        </IconButton>
      </div>
    </form>
  );
};

export default ChapterForm;
