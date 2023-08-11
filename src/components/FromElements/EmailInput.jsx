/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const EmailInput = ({ control, value = "", disabled }) => {
  return (
    <Controller
      name="email"
      control={control}
      defaultValue={value}
      rules={{
        required: "Email is required field",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@gmail.com$/i,
          message: "Invalid gmail address",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          name="email"
          type="email"
          label="Email"
          disabled={disabled}
          error={!!error}
          helperText={error ? error.message : null}
          {...field}
        />
      )}
    />
  );
};

export default EmailInput;
