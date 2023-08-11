import { Outlet } from "react-router-dom";
import MiniDrawer from "../../../src/components/MenuBarLayout";
const Instructor = () => {
  return (
    <MiniDrawer menuType="i">
      <Outlet />
    </MiniDrawer>
  );
};

export default Instructor;
