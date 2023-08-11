import { Tooltip } from "@mui/material";
import { useState } from "react";
import Images from "../Images";
import "./index.css";
const UploadCourseCover = ({ src, name, readOnly }) => {
  const [Src, setSrc] = useState(src);
  const handleInput = (e) => {
    var file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSrc(reader.result);
    };
  };
  return (
    <Tooltip
      title="click to change course cover photo in 16:9 ratio"
      placement="top"
      arrow
    >
      <div className="course-cover-img">
        <label htmlFor={name}>
          <img src={Src ? Src : Images.courseCover} alt="cover-img" />
        </label>
        <input
          id={name}
          accept="image/*"
          type="file"
          hidden
          name={name}
          disabled={readOnly}
          onChangeCapture={handleInput}
        />
      </div>
    </Tooltip>
  );
};

export default UploadCourseCover;
