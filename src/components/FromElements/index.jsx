/* eslint-disable react/prop-types */
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  CircularProgress,
  Fab,
  FormControlLabel,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { green } from "@mui/material/colors";
import {
  MdAdd,
  MdCheck,
  MdDone,
  MdEdit,
  MdRefresh,
  MdSave,
} from "react-icons/md";

export const Button = ({
  value,
  variant = "contained",
  size = "large",
  ...props
}) => {
  return (
    <LoadingButton size={size} variant={variant} {...props}>
      {value}
    </LoadingButton>
  );
};

export const AlertMsg = ({ msg = "", type = "" }) => {
  return (
    <Alert severity={type} variant="standard">
      {msg}
    </Alert>
  );
};

export const CustomInput = ({
  name,
  type,
  label,
  value,
  required,
  ...props
}) => {
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      defaultValue={value}
      required={required}
      {...props}
    />
  );
};
export const Img = (props) => {
  return <img {...props} style={{ width: props?.width }} draggable={false} />;
};

export const SaveButton = ({ loading, success, onClick }) => {
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  return (
    <Tooltip title="click to Save" arrow>
      <Box sx={{ m: 1, position: "absolute", right: 50 }}>
        <Fab
          aria-label="save"
          color="primary"
          disabled={loading}
          sx={buttonSx}
          type="submit"
          onClick={onClick}
        >
          {success ? <MdCheck size={25} /> : <MdSave size={25} />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
};

export const EditButton = (props) => {
  return (
    <Tooltip title="click to enable edit" arrow>
      <Box sx={{ m: 1, position: "absolute", right: 50 }}>
        <Fab aria-label="save" color="primary" type="button" {...props}>
          <MdEdit size={25} />
        </Fab>
      </Box>
    </Tooltip>
  );
};

export const AddButton = ({ name, icon = "add", ...props }) => {
  return (
    <Tooltip title={`click to ${name}`} arrow>
      <Box sx={{ m: 1 }}>
        <Fab aria-label="save" color="primary" type="button" {...props}>
          {icon === "add" ? <MdAdd size={25} /> : <MdRefresh size={25} />}
        </Fab>
      </Box>
    </Tooltip>
  );
};

export const CustomSwitch = ({
  required = false,
  name = "",
  checked = false,
  disabled = false,
}) => {
  return (
    <FormControlLabel
      sx={{ marginLeft: "10px" }}
      required={required}
      control={<Switch defaultChecked={checked} />}
      name={name}
      disabled={disabled}
    />
  );
};

export const CoursePoints = ({ point }) => {
  return (
    <p className="course-points">
      <span>
        <MdDone style={{ paddingTop: "5px" }} />
      </span>
      {point}
    </p>
  );
};
