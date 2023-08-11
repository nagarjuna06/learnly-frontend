/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import { CustomInput } from "./index";
import { MdOutlineClose, MdOutlineSave } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
const ContentForm = ({ content = null, onSubmit, close, setEdit }) => {
  const { control, handleSubmit } = useForm({ defaultValues: { ...content } });
  const handleClose = () => {
    if (!!content.contentTitle) {
      setEdit(false);
    } else {
      close();
    }
  };
  return (
    <form className="chapter-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="contentTitle"
        control={control}
        rules={{
          required: "Content title is required field.",
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomInput
            name="contentTitle"
            type="text"
            label="Content Title"
            fullWidth
            size="small"
            {...field}
            error={!!error}
            min="00:00:30"
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="embedUrl"
        control={control}
        rules={{
          required: "embed URL is required field",
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomInput
            name="embedUrl"
            type="text"
            label="Video URL"
            fullWidth
            size="small"
            {...field}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="duration"
        control={control}
        rules={{
          required: "Duration is required field",
        }}
        render={({ field, fieldState: { error } }) => (
          <CustomInput
            name="duration"
            type="time"
            label="Duration"
            inputProps={{ step: 2, min: "00:00:30" }}
            sx={{ width: "500px" }}
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

export default ContentForm;
