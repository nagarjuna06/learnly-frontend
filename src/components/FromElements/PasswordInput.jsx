/* eslint-disable react/prop-types */
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ control, value = "", disabled }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Controller
      name="password"
      control={control}
      defaultValue={value}
      rules={{
        required: "Password is required field",
        pattern: {
          value:
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          message:
            "Password must be at least 8 characters long and contain at least one letter, one digit, and one special character (@$!%*#?&).",
        },
        maxLength: {
          value: 20,
          message: "Your password must be maximum 20 characters.",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <FormControl variant="outlined">
          <InputLabel error={!!error}>Password</InputLabel>
          <OutlinedInput
            name="password"
            autoComplete="off"
            type={showPassword ? "text" : "password"}
            error={!!error}
            disabled={disabled}
            {...field}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? (
                    <AiOutlineEyeInvisible color="#999" />
                  ) : (
                    <AiOutlineEye color="#999" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText error>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;
