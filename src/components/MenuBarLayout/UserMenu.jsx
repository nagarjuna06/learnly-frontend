import { AppBar, CssBaseline, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Img } from "../FromElements";
import Images from "../Images";
import CustomAvatar from "../Avatar";

const UserMenu = ({ instructor = false, header = "" }) => {
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{
          background: "#fff",
          color: "#000",
          padding: "5px 0px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">
            <Img src={Images.logo} className="app-bar-img" />
          </Link>
          <h2 className="course-title">{header}</h2>
          <div className="user-menu-profile">
            {instructor ? (
              <Link to="/instructor/courses">Instructor</Link>
            ) : null}
            <CustomAvatar />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default UserMenu;
