import { Outlet } from "react-router-dom";
import NavBar from "../../src/components/NavBar/NavBar";
const Main = () => {
  return (
    <div className="bg">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Main;
