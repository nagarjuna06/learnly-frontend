/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../pages/signup";
import "./App.css";
import Login from "../pages/login";
import Home from "../pages/home";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import ForgotPassword from "../pages/forgot-password";
import ErrorPopup from "./components/Popups/Error";
import OfflinePopup from "./components/Popups/Offline";
import Main from "../pages/Main";
import PageNotFound from "../pages/page-not-found";
import UpdateUserDetails from "../pages/user";
import ProtectInstructor from "./components/Routes/ProtectInstructor";
import MyLearning from "../pages/my-learning";
import Instructor from "../pages/instructor/instructor";
import InstructorProfile from "../pages/instructor/instructor/InstructorProfile";
import InstructorCourses from "../pages/instructor/instructor/InstructorCourses";
import CourseManage from "../pages/instructor/manage course";
import CourseDetails from "../pages/instructor/manage course/CourseDetails";
import Curriculum from "../pages/instructor/manage course/Curriculum";
import Intended from "../pages/instructor/manage course/Intended";
import Pricing from "../pages/instructor/manage course/Pricing";
import Settings from "../pages/instructor/manage course/Settings";
import { projectMode } from "./utils";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Collaboration from "../pages/instructor/manage course/Collaboration";
import InstructorSettings from "../pages/instructor/instructor/Settings";
import CollaboratedCourses from "../pages/instructor/instructor/CollaboratedCourses";
import CollaborationManage from "../pages/instructor/manage collaboations";
import ManageAccess from "../pages/instructor/manage collaboations/ManageAccess";
import CourseLandingPage from "../pages/course-landing-page";
import WishList from "../pages/user/WishList";
import Cart from "../pages/user/Cart";
import CoursePreview from "../pages/instructor/manage course/CoursePreview";
import MyCourses from "../pages/my-learning/MyCourses";
import CourseLearning from "../pages/my-learning/CourseLearning";
import SearchCourses from "../pages/home/SearchCourses";
import CategoriesSearch from "../pages/home/CategoriesSearch";
import OgTags from "./components/Og Tags";
import { HelmetProvider } from "react-helmet-async";

if (!projectMode) {
  disableReactDevTools();
}
const App = () => {
  return (
    <HelmetProvider>
      <OgTags />
      <ErrorPopup />
      <OfflinePopup />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/profile" element={<UpdateUserDetails />} />
            <Route path="/user/wishlist" element={<WishList />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/courses/search" element={<SearchCourses />} />
            <Route path="/courses/:category" element={<CategoriesSearch />} />
            <Route
              path="/courses/:category/:sub"
              element={<CategoriesSearch />}
            />
            <Route path="/course/:slug" element={<CourseLandingPage />} />
          </Route>
          <Route path="/user/learning" element={<MyLearning />}>
            <Route path="/user/learning" element={<MyCourses />} />
            <Route path="/user/learning/:slug" element={<CourseLearning />} />
          </Route>

          <Route path="/instructor" element={<ProtectInstructor />}>
            <Route
              path="/instructor"
              element={<Navigate to="/instructor/courses" />}
            />
            <Route element={<Instructor />}>
              <Route
                path="/instructor/profile"
                element={<InstructorProfile />}
              />
              <Route
                path="/instructor/courses"
                element={<InstructorCourses />}
              />
              <Route
                path="/instructor/collaborate"
                element={<CollaboratedCourses />}
              />
              <Route
                path="/instructor/settings"
                element={<InstructorSettings />}
              />
            </Route>
            <Route
              path="/instructor/courses/:courseId"
              element={<CourseManage />}
            >
              <Route
                path="/instructor/courses/:courseId"
                element={<Navigate to="/instructor/courses" />}
              />
              <Route
                path="/instructor/courses/:courseId/details"
                element={<CourseDetails />}
              />
              <Route
                path="/instructor/courses/:courseId/curriculum"
                element={<Curriculum />}
              />
              <Route
                path="/instructor/courses/:courseId/intended"
                element={<Intended />}
              />
              <Route
                path="/instructor/courses/:courseId/collaboration"
                element={<Collaboration />}
              />
              <Route
                path="/instructor/courses/:courseId/pricing"
                element={<Pricing />}
              />
              <Route
                path="/instructor/courses/:courseId/settings"
                element={<Settings />}
              />
              <Route
                path="/instructor/courses/:courseId/preview"
                element={<CoursePreview />}
              />
            </Route>
            <Route
              path="/instructor/collaborate/:courseId"
              element={<CollaborationManage />}
            >
              <Route
                path="/instructor/collaborate/:courseId"
                element={<Navigate to="/instructor/collaborate" />}
              />
              <Route
                path="/instructor/collaborate/:courseId/:accessId"
                element={<ManageAccess />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
