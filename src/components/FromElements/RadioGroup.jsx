import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const CustomRadioGroup = () => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="Free"
          control={<Radio />}
          label="Free"
          checked
        />
        <FormControlLabel
          value="Paid"
          control={<Radio />}
          label="Paid"
          disabled
        />
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
