/* eslint-disable no-extra-boolean-cast */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { currentUser } from "../../../redux/slice/authSlice";
import { instructorProfile } from "../../../redux/slice/instructorSlice";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, profile } = useSelector((state) => state.auth);
  const { profile: instrutor } = useSelector((state) => state.instructor);
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!profile) {
      dispatch(currentUser());
    }
    if (profile?.role === "Instructor" && !instrutor) {
      dispatch(instructorProfile());
    }
  }, [dispatch, profile, isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
