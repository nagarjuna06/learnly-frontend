import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { checkboxArray } from "../../utils";

const initialState = {
  details: false,
  intended: false,
  curriculum: false,
};
const CheckBoxes = ({
  onSubmit,
  className,
  children = null,
  checkBoxState = initialState,
}) => {
  const [state, setState] = useState(checkBoxState);
  const [data, setData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.length) {
      onSubmit(data);
    }
    return;
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };
  const handleAll = (e) => {
    let checkAll = {};
    if (e.target.checked) {
      for (let item in state) {
        checkAll[item] = true;
      }
      setState(checkAll);
    } else {
      setState(initialState);
    }
  };
  useEffect(() => {
    let data = [];
    for (let item in state) {
      if (state[item]) {
        data.push(item);
      }
    }
    setData(data);
  }, [state]);
  return (
    <form id="check" className={className} onSubmit={handleSubmit}>
      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="all"
                checked={data.length === 3}
                indeterminate={data.length < 3}
                onChange={handleAll}
                value="all"
              />
            }
            label="All"
          />

          {checkboxArray.map((each, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={state[each.value]}
                  name={each.value}
                  value={each.value}
                  onChange={handleChange}
                />
              }
              label={each.label}
            />
          ))}
        </FormGroup>
        <p style={{ color: "red" }}>
          {!data.length ? "Please select at least one option." : null}
        </p>
      </FormControl>
      {children}
    </form>
  );
};

export default CheckBoxes;
