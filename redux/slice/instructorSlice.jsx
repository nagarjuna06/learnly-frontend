import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../axios";
import { getUUID } from "../../src/utils";
const initialState = {
  createCourse: { loading: false, error: false },
  loading: false,
  success: false,
  error: false,
  profile: null,
  courses: [],
  course: {},
  role: null,
  msg: null,
  curriculum: [],
  fetchDetails: null,
  team: [],
  collaboratedCourses: [],
  access: [],
};

export const instructorProfile = createAsyncThunk(
  "instructor/profile",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/instructor`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const instructorProfileUpdate = createAsyncThunk(
  "instructor/profile/update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/instructor/update`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const instructorCourses = createAsyncThunk(
  "instructor/courses",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course/manage`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const instructorCreateCourse = createAsyncThunk(
  "instructor/courses/create",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/course/create`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const instructorCourseById = createAsyncThunk(
  "instructor/courses/:id",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course/manage/${courseId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateInstructorCourseById = createAsyncThunk(
  "instructor/courses/:id/update",
  async ({ courseId, body }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API}/course/manage/${courseId}`,
        body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchInstructorDetail = createAsyncThunk(
  "instructor/learnlyId",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/instructor/learnlyId`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCourseTeam = createAsyncThunk(
  "instructor/team/create",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/instructor/team`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCourseTeam = createAsyncThunk(
  "instructor/team/get",
  async (course, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/instructor/team/${course}`);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCourseTeam = createAsyncThunk(
  "instructor/team/update",
  async ({ course, ...body }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API}/instructor/team/${course}`,
        body
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCourseTeam = createAsyncThunk(
  "instructor/team/delete",
  async ({ course, id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API}/instructor/team/${course}/${id}`
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInstructorCourseById = createAsyncThunk(
  "instructor/courses/:id/delete",
  async ({ courseId, body }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API}/course/manage/${courseId}`,
        body
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCoursesByTeam = createAsyncThunk(
  "course/collaborate",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course/collaborate`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    changes: (state) => {
      state.success = false;
    },
    noChanges: (state) => {
      state.success = true;
    },
    initializeCurriculum: (state) => {
      state.curriculum = state.course.curriculum;
    },
    createChapter: (state) => {
      state.curriculum = [
        ...state.curriculum,
        { id: getUUID(), chapterTitle: "", duration: "", contents: [] },
      ];
      state.success = false;
    },
    createContent: (state, { payload: { chIndex } }) => {
      state.curriculum[chIndex].contents = [
        ...state.curriculum[chIndex].contents,
        { id: getUUID(), contentTitle: "", embedUrl: "", duration: "00:00:00" },
      ];
      state.success = false;
    },
    updateChapter: (state, { payload: { chapter, chIndex } }) => {
      state.curriculum[chIndex] = chapter;
      state.success = false;
    },
    updateContent: (state, { payload: { chIndex, coIndex, content } }) => {
      state.curriculum[chIndex].contents[coIndex] = content;
      state.success = false;
    },
    deleteChapter: (state, { payload: { id } }) => {
      state.curriculum = state.curriculum.filter((each) => each.id !== id);
      state.success = false;
    },
    deleteContent: (state, { payload: { id, chIndex } }) => {
      state.curriculum[chIndex].contents = state.curriculum[
        chIndex
      ].contents.filter((each) => each.id !== id);
      state.success = false;
    },
    moveChapter: (state, { payload: { fromIndex, toIndex } }) => {
      let newCurriculum = [...state.curriculum];
      const [removeItem] = newCurriculum.splice(fromIndex, 1);
      newCurriculum.splice(toIndex, 0, removeItem);
      state.curriculum = newCurriculum;
      state.success = false;
    },
    moveContent: (
      state,
      { payload: { fromDId, toDId, fromIndex, toIndex } }
    ) => {
      const fromChapterIndex = state.curriculum.findIndex(
        (chapter) => chapter.id === fromDId
      );
      const toChapterIndex = state.curriculum.findIndex(
        (chapter) => chapter.id === toDId
      );

      const newFromContent = [...state.curriculum[fromChapterIndex].contents];

      const newToContent =
        fromDId !== toDId
          ? [...state.curriculum[toChapterIndex].contents]
          : newFromContent;

      const [removeContent] = newFromContent.splice(fromIndex, 1);
      newToContent.splice(toIndex, 0, removeContent);
      const newCurriculum = [...state.curriculum];

      newCurriculum[fromChapterIndex] = {
        ...newCurriculum[fromChapterIndex],
        contents: newFromContent,
      };

      newCurriculum[toChapterIndex] = {
        ...newCurriculum[toChapterIndex],
        contents: newToContent,
      };

      state.curriculum = newCurriculum;
      state.success = false;
    },
    setAccess: (state, { payload }) => {
      state.access = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(instructorProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(instructorProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.profile = payload;
      })
      .addCase(instructorProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.msg = payload.msg;
      })
      .addCase(instructorProfileUpdate.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(instructorProfileUpdate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.profile = payload;
      })
      .addCase(instructorProfileUpdate.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.msg = payload.msg;
      })
      .addCase(instructorCourses.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(instructorCourses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.courses = payload;
      })
      .addCase(instructorCourses.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(instructorCreateCourse.pending, (state) => {
        state.createCourse.loading = true;
        state.createCourse.error = false;
      })
      .addCase(instructorCreateCourse.fulfilled, (state) => {
        state.createCourse.loading = false;
      })
      .addCase(instructorCreateCourse.rejected, (state, { payload }) => {
        state.createCourse.loading = false;
        state.createCourse.error = true;
        state.msg = payload.msg;
      })
      .addCase(instructorCourseById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(
        instructorCourseById.fulfilled,
        (state, { payload: { course, role, access } }) => {
          state.loading = false;
          state.success = true;
          state.course = course;
          state.role = role;
          state.access = access;
        }
      )
      .addCase(instructorCourseById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateInstructorCourseById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(
        updateInstructorCourseById.fulfilled,
        (state, { payload: { course, role, access } }) => {
          state.loading = false;
          state.success = true;
          if (course) {
            state.course = course;
            state.role = role;
            state.access = access;
          } else {
            location.href = "/instructor";
          }
        }
      )
      .addCase(updateInstructorCourseById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteInstructorCourseById.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(deleteInstructorCourseById.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteInstructorCourseById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchInstructorDetail.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(fetchInstructorDetail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.fetchDetails = payload;
      })
      .addCase(fetchInstructorDetail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.msg = payload.msg;
      })
      .addCase(createCourseTeam.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(createCourseTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.fetchDetails = null;
      })
      .addCase(createCourseTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.msg = payload.msg;
      })
      .addCase(getCourseTeam.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getCourseTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.team = payload;
      })
      .addCase(getCourseTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.msg = payload.msg;
      })
      .addCase(updateCourseTeam.pending, (state) => {
        state.error = false;
        state.success = false;
      })
      .addCase(updateCourseTeam.fulfilled, (state, { payload }) => {
        state.success = true;
        state.team = payload;
      })
      .addCase(updateCourseTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.msg = payload.msg;
      })
      .addCase(deleteCourseTeam.pending, (state) => {
        state.error = false;
        state.success = false;
      })
      .addCase(deleteCourseTeam.fulfilled, (state, { payload }) => {
        state.success = true;
        state.team = payload;
      })
      .addCase(deleteCourseTeam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
        state.msg = payload.msg;
      })
      .addCase(getCoursesByTeam.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getCoursesByTeam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.collaboratedCourses = payload;
      })
      .addCase(getCoursesByTeam.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  changes,
  noChanges,
  initializeCurriculum,
  createChapter,
  createContent,
  updateChapter,
  updateContent,
  deleteChapter,
  deleteContent,
  moveChapter,
  moveContent,
  setAccess,
} = instructorSlice.actions;

export default instructorSlice.reducer;
