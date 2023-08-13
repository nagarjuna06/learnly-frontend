import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../axios";
import axios from "axios";
const initialState = {
  msg: null,
  ApplicationError: false,
  serverStarted: false,
};
export const startTheServer = createAsyncThunk(
  "startTheServer",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(API, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
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
  extraReducers: (builders) => {
    builders.addCase(startTheServer.fulfilled, (state) => {
      state.serverStarted = true;
    });
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
