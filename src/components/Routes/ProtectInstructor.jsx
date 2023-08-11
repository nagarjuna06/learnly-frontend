import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import DeviceCompact from "../../../pages/page-not-found/DeviceCompact";
import { useEffect, useState } from "react";
import { projectMode } from "../../utils";

const ProtectInstructor = () => {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const { profile } = useSelector((state) => state.auth);
  const handleDeviceWidth = () => {
    setDeviceWidth(window.innerWidth);
  };
  const handleBeforeUnload = (event) => {
    const confirmationMessage = "Are you sure you want to leave this page?";
    (event || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
  };
  useEffect(() => {
    window.addEventListener("resize", handleDeviceWidth);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("resize", handleDeviceWidth);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return profile ? (
    profile.role === "Instructor" ? (
      deviceWidth > 1000 || projectMode ? (
        <Outlet />
      ) : (
        <DeviceCompact />
      )
    ) : (
      <Navigate to="/" replace />
    )
  ) : null;
};

export default ProtectInstructor;
