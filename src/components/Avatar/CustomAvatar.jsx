/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";

const CustomAvatarOnly = ({ alt = "", src = "", size = 50 }) => {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: size,
        height: size,
        fontSize: size / 2,
        background: "#1976d2",
      }}
    >
      {src ? "" : alt ? alt.charAt(0).toUpperCase() : "U"}
    </Avatar>
  );
};

export default CustomAvatarOnly;
