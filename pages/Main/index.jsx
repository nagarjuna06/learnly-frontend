import { Outlet } from "react-router-dom";
import NavBar from "../../src/components/NavBar/NavBar";
import { Helmet } from "react-helmet";

const Main = () => {
  return (
    <div className="bg">
      <Helmet>
        <title>Learnly</title>
      </Helmet>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Main;
