import { Outlet } from "react-router-dom";
import UserMenu from "../../src/components/MenuBarLayout/UserMenu";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const MyLearning = () => {
  const instructor = useSelector((state) => state.instructor.profile);
  return (
    <div>
      <Helmet>
        <title>My learning</title>
      </Helmet>
      <UserMenu instructor={instructor?.name} />
      <Outlet />
    </div>
  );
};

export default MyLearning;
