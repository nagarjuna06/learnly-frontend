import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../axios";

export const getAllCourses = createAsyncThunk(
  "getAllCorses",
  async (body = "", { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course${body}`);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCourse = createAsyncThunk(
  "getCourse",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course/${slug}`);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  allCourses: [],
  course: {},
  error: false,
  success: false,
  loading: false,
  msg: null,
};
const courseSlice = createSlice({
  name: "course",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getAllCourses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.allCourses = payload;
      })
      .addCase(getCourse.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getCourse.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.course = payload;
      });
  },
});

export default courseSlice.reducer;
