/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const DropDownInput = ({
  name = "",
  label = "",
  value = "",
  data = [],
  required = false,
  onChange = () => {},
  valueExtractor,
  labelExtractor,
}) => {
  return (
    <FormControl variant="outlined" sx={{ width: "100%" }}>
      <InputLabel id={label} required={required}>
        {label}
      </InputLabel>
      <Select
        name={name}
        labelId={label}
        required={required}
        label={label}
        onChange={onChange}
        defaultValue={value}
      >
        {data.map((item, index) => (
          <MenuItem key={index} value={valueExtractor(item)}>
            {labelExtractor(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDownInput;
