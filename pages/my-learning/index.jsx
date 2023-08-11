import { Outlet } from "react-router-dom";
import UserMenu from "../../src/components/MenuBarLayout/UserMenu";
import { useSelector } from "react-redux";
const MyLearning = () => {
  const instructor = useSelector((state) => state.instructor.profile);
  return (
    <div>
      <UserMenu instructor={instructor?.name} />
      <Outlet />
    </div>
  );
};

export default MyLearning;
