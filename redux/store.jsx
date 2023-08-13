import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import errorSlice from "./slice/errorSlice";
import instructorSlice from "./slice/instructorSlice";
import { projectMode } from "../src/utils";
import courseSlice from "./slice/courseSlice";

const Store = configureStore({
  reducer: {
    error: errorSlice,
    auth: authSlice,
    instructor: instructorSlice,
    course: courseSlice,
  },
  devTools: projectMode,
});

export default Store;
