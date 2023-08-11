import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import {
  MdCastForEducation,
  MdLogout,
  MdSettings,
  MdSchool,
  MdHome,
} from "react-icons/md";
import { BiSolidBookReader } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { becomeInstructor, logout } from "../../../redux/slice/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getInitials } from "../../utils";
import AvatarSkelton from "../Skelton/AvatarSkelton";
import "./index.css";
const CustomAvatar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { profile, guestMode, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = async (path) => {
    handleClose();
    navigate(path);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleBecomeAnInstructor = async (path) => {
    if (guestMode) {
      dispatch(logout());
      return;
    }
    await dispatch(becomeInstructor());
    navigate(path);
  };

  let menus = [
    {
      icon: MdHome,
      label: "Home",
      path: "/",
      get onClick() {
        return () => handleOnClick(this.path);
      },
    },
    {
      icon: BiSolidBookReader,
      label: "My Learning",
      path: "/user/learning",
      hide: true,
      get onClick() {
        return () => handleOnClick(this.path);
      },
    },
    {
      icon: MdSettings,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: MdLogout,
      label: "Logout",
      path: "/login",
      get onClick() {
        return () => handleLogout();
      },
    },
  ];
  if (profile?.role === "Learner") {
    menus.splice(1, 0, {
      icon: MdCastForEducation,
      label: "Become an Instructor",
      path: "/instructor/courses",
      get onClick() {
        return () => handleBecomeAnInstructor(this.path);
      },
    });
  } else {
    menus.splice(2, 0, {
      icon: MdSchool,
      label: "Instructor",
      hide: true,
      path: "/instructor/courses",
      get onClick() {
        return () => handleOnClick(this.path);
      },
    });
  }
  return profile ? (
    <>
      <div className="main-avatar">
        <Avatar
          src={profile?.avatar}
          alt={profile.name}
          className="cursor-pointer"
          onMouseOver={handleClick}
          onClick={handleClick}
          sx={{
            width: "100%",
            height: "100%",
            background: "#1976d2",
          }}
        >
          {profile?.avatar ? "" : getInitials(profile.name)}
        </Avatar>
      </div>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open && isAuthenticated}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleOnClick("/user/profile")}>
          <Avatar src={profile?.avatar} />
          <p>My Account</p>
        </MenuItem>
        <Divider />
        {menus.map((item, index) => (
          <div key={index} className={item.hide ? "hide" : null}>
            {pathname !== item.path ? (
              <MenuItem onClick={item.onClick}>
                <item.icon className="profile-icons" />
                <p>{item.label}</p>
              </MenuItem>
            ) : null}
          </div>
        ))}
      </Menu>
    </>
  ) : (
    <AvatarSkelton />
  );
};
export default CustomAvatar;
