/* eslint-disable react/prop-types */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import {
  MdOndemandVideo,
  MdSettings,
  MdOutlineInfo,
  MdOutlineSettings,
  MdOutlinePeople,
  MdOutlineMonetizationOn,
  MdHome,
  MdOutlineHome,
  MdOutlineArrowCircleLeft,
  MdSchool,
  MdOutlineToc,
  MdOutlineHandshake,
  MdHandshake,
  MdOutlineRefresh,
  MdOutlinePreview,
} from "react-icons/md";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Img } from "../FromElements";
import Images from "../Images";
import CustomAvatar from "../Avatar";
import { useDispatch, useSelector } from "react-redux";
import { noChanges } from "../../../redux/slice/instructorSlice";
import { accessedMenus, setCourseIdToPath } from "../../utils";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: 75,
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  padding: 5,
  background: "#fff",
  color: "#000",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const InstructorMenu = [
  {
    icon: MdHome,
    label: "Home",
    path: "/",
  },
  {
    icon: MdOndemandVideo,
    label: "Courses",
    path: "/instructor/courses",
  },
  {
    icon: MdSchool,
    label: "Profile",
    path: "/instructor/profile",
  },
  {
    icon: MdHandshake,
    label: "Collaborated Courses",
    path: "/instructor/collaborate",
  },
  {
    icon: MdSettings,
    label: "Settings",
    path: "/instructor/settings",
  },
];
const courseMenu = [
  {
    icon: MdOutlineHome,
    label: "Home",
    path: "/",
  },
  {
    icon: MdOutlineArrowCircleLeft,
    label: "Back to Courses",
    path: "/instructor/courses",
  },
  {
    icon: MdOutlineInfo,
    label: "Course Details",
    path: "/instructor/courses/{{courseId}}/details",
  },
  {
    icon: MdOutlinePeople,
    label: "Intended learners",
    path: "/instructor/courses/{{courseId}}/intended",
  },
  {
    icon: MdOutlineToc,
    label: "Curriculum",
    path: "/instructor/courses/{{courseId}}/curriculum",
  },
  {
    icon: MdOutlineHandshake,
    label: "Collaboration",
    path: "/instructor/courses/{{courseId}}/collaboration",
  },
  {
    icon: MdOutlineMonetizationOn,
    label: "Pricing",
    path: "/instructor/courses/{{courseId}}/pricing",
  },
  {
    icon: MdOutlineSettings,
    label: "Settings",
    path: "/instructor/courses/{{courseId}}/settings",
  },
  {
    icon: MdOutlinePreview,
    label: "Preview",
    path: "/instructor/courses/{{courseId}}/preview",
  },
  {
    icon: MdOutlineRefresh,
    label: "Refresh",
    path: "",
  },
];
const collaborationMenu = [
  {
    icon: MdOutlineHome,
    label: "Home",
    path: "/",
  },
  {
    icon: MdOutlineArrowCircleLeft,
    label: "Back to Collaborate",
    path: "/instructor/collaborate",
  },
  {
    icon: MdOutlineInfo,
    label: "Course Details",
    path: "/instructor/collaborate/{{courseId}}/details",
    access: "details",
  },
  {
    icon: MdOutlinePeople,
    label: "Intended learners",
    path: "/instructor/collaborate/{{courseId}}/intended",
    access: "intended",
  },
  {
    icon: MdOutlineToc,
    label: "Curriculum",
    path: "/instructor/collaborate/{{courseId}}/curriculum",
    access: "curriculum",
  },
  {
    icon: MdOutlineRefresh,
    label: "Refresh",
    path: "",
  },
];

const MiniDrawer = ({ menuType, children, onRefresh }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { course, success, access } = useSelector((state) => state.instructor);
  let menu = [];
  switch (menuType) {
    case "i":
      menu = InstructorMenu;
      break;
    case "c":
      menu = setCourseIdToPath(courseMenu, params.courseId);
      break;
    case "co":
      if (access.length) {
        menu = accessedMenus(collaborationMenu, access, params.courseId);
      } else {
        menu = [];
      }
      break;
    default:
      menu = [];
  }
  const courseTitle = menuType === "c" || menuType === "co" ? course.title : "";
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuClick = (path) => {
    if (!path) {
      navigate(0);
      return;
    }
    if (!success) {
      const confirmationMessage = confirm(
        "You have unsaved changes. Do you really wish to continue without saving?"
      );
      if (confirmationMessage) {
        dispatch(noChanges());
        navigate(path);
      }
      return;
    }
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">
            <Img src={Images.logo} className="app-bar-img" />
          </Link>
          <h2 className="course-title">{courseTitle}</h2>
          <div className="menu-profile">
            <Link to="/user/learning">Student</Link>
            <CustomAvatar />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseOver={() => handleDrawerOpen()}
        onMouseLeave={() => handleDrawerClose()}
      >
        <DrawerHeader />
        <Divider />
        <List>
          {menu.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: "block",
                height: 50,
                // background: pathname === item.path ? "#ddd" : "#fff",
              }}
              onClick={() => handleMenuClick(item.path, params?.courseId)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <item.icon
                    className={`menu-icon ${
                      pathname === item.path && "menu-icon-active"
                    }`}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
MiniDrawer.defaultProps = {
  menuType: "i",
  children: "",
  title: "",
};

export default MiniDrawer;
