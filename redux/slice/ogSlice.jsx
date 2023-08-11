import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: "Learnly",
  description: "Best Online Courses | Learn to Succeed",
  image:
    "https://res.cloudinary.com/myweb1234/image/upload/v1689729032/learnly-favicon_gsyt7z.png",
};
const ogSlice = createSlice({
  name: "og",
  initialState,
  reducers: {
    setOg: (state, { payload }) => {
      Object.assign(state, payload);
    },
    initOg: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setOg, initOg } = ogSlice.actions;
export default ogSlice.reducer;
