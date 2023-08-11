/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const NameInput = ({ control, value = "", disabled }) => {
  return (
    <Controller
      name="name"
      control={control}
      defaultValue={value}
      rules={{
        required: "Name is required field",
        minLength: {
          value: 5,
          message: "Name must be at least 8 characters long",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          name="name"
          type="text"
          label="Name"
          disabled={disabled}
          error={!!error}
          helperText={error ? error.message : null}
          {...field}
        />
      )}
    />
  );
};

export default NameInput;
