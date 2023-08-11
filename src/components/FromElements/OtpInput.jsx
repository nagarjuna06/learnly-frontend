/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const OtpInput = ({ control, value = "", disabled }) => {
  return (
    <Controller
      name="otp"
      control={control}
      defaultValue={value}
      rules={{
        required: "OTP is required field",
        minLength: {
          value: 6,
          message: "OTP must be 6 digits",
        },
        maxLength: {
          value: 6,
          message: "OTP must be 6 digits",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          name="otp"
          type="number"
          label="OTP"
          error={!!error}
          disabled={disabled}
          helperText={error ? error.message : null}
          {...field}
        />
      )}
    />
  );
};

export default OtpInput;
