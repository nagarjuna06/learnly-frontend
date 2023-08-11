import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../axios";
import axios from "axios";
const initialState = {
  msg: null,
  ApplicationError: false,
  serverStarted: false,
};
const errorSlice = createSlice({
  name: "Application Errors",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.msg = payload.msg;
      state.ApplicationError = true;
    },
    resetError: (state) => {
      state.ApplicationError = false;
      state.msg = null;
    },
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
