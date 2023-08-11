import { Avatar, Tooltip } from "@mui/material";
import { getInitials } from "../../utils";
import "./index.css";
import { useState } from "react";

const UploadAvatar = ({
  src,
  alt,
  name,
  className = "",
  readOnly,
  ...props
}) => {
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
    <div className={`large-avatar ${className}`}>
      <div>
        <Tooltip title="click to change profile photo" arrow>
          <Avatar
            htmlFor="file"
            src={Src}
            alt={alt}
            sx={{
              width: "100%",
              height: "100%",
              fontSize: 50,
              boxShadow: "0px 0px 20px #bbb",
              cursor: "pointer",
            }}
            component="label"
          >
            {props ? getInitials(alt) : null}
          </Avatar>
        </Tooltip>
        <input
          id="file"
          accept="image/*"
          type="file"
          hidden
          name={name}
          disabled={readOnly}
          onChangeCapture={handleInput}
        />
      </div>
    </div>
  );
};
UploadAvatar.defaultProps = {
  src: "",
  alt: "User",
  readOnly: false,
};
export default UploadAvatar;
