/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { API, initialAuthenticate } from "../../axios";
import { getVideoList } from "../../src/utils";

const initialState = {
  loading: false,
  success: false,
  sendOtp: false,
  error: false,
  cartLoading: false,
  cartCourses: [],
  wishlistLoading: false,
  wishlistCourses: [],
  checkOutLoading: false,
  enrolledCourses: [],
  msg: null,
  profile: null,
  guestMode: false,
  learning: [],
  ratingLoading: false,
  progress: 0,
  videosData: [],
  isAuthenticated: initialAuthenticate(),
};

export const signup = createAsyncThunk(
  "signup",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/auth/register`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signupOtpVerify = createAsyncThunk(
  "signupOtpVerify",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/auth/verify`, body);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/auth/login`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotpassword = createAsyncThunk(
  "forgotpassword",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/auth/reset`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetOtpVerify = createAsyncThunk(
  "verifyResetOtp",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/auth/verify`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const currentUser = createAsyncThunk(
  "user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/user`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/user/update`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const becomeInstructor = createAsyncThunk(
  "becomeInstructor",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/instructor`, body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getWishlist = createAsyncThunk(
  "getWishlist",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/user/wishlist`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "addToWishlist",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/user/wishlist`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "removeFromWishlist",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/user/wishlist`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCart = createAsyncThunk(
  "getCart",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/user/cart`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const addToCart = createAsyncThunk(
  "addToCart",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/user/cart`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/user/cart`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkOut = createAsyncThunk(
  "checkOut",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/user/checkout`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const myLearning = createAsyncThunk(
  "myLearning",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course/my-learning`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const courseCurriculum = createAsyncThunk(
  "courseCurriculum",
  async ({ slug, enroll }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/course/${slug}/curriculum?enroll=${enroll}`
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

export const updateProgress = createAsyncThunk(
  "updateProgress",
  async (body, { getState, rejectWithValue }) => {
    try {
      const currentState = getState();
      const data = {
        _id: currentState.auth.learning._id,
        progress: currentState.auth.progress,
      };
      const response = await axios.post(`${API}/course/update-progress`, data);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const newReview = createAsyncThunk(
  "newReview",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/course/review`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  "updateReview",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/course/review`, body);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("_token");
      Object.assign(state, initialState);
      setTimeout(() => {
        if (location.pathname !== "/login") {
          location.href = "/login";
        }
      }, 1000);
    },
    clear: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.sendOtp = false;
      state.msg = null;
    },

    setProgress: (state, { payload }) => {
      state.progress = payload;
    },
    incProgress: (state) => {
      const length = state.videosData.length;
      if (state.progress < length - 1) {
        state.progress += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.msg = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.sendOtp = true;
        state.msg = action.payload.msg;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        state.msg = action.payload.msg;
      })
      .addCase(signupOtpVerify.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.msg = false;
      })
      .addCase(signupOtpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.isAuthenticated = true;
        state.sendOtp = false;
        Cookies.set("_token", action.payload.jwtToken, { expires: 30 });
      })
      .addCase(signupOtpVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        state.msg = action.payload.msg;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.msg = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.isAuthenticated = true;
        Cookies.set("_token", action.payload.jwtToken, { expires: 30 });
        initialAuthenticate(false);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        state.msg = action.payload.msg;
      })
      .addCase(forgotpassword.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.msg = false;
      })
      .addCase(forgotpassword.fulfilled, (state, action) => {
        state.loading = false;
        state.sendOtp = true;
        state.msg = action.payload.msg;
      })
      .addCase(forgotpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        state.msg = action.payload.msg;
      })
      .addCase(resetOtpVerify.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.msg = false;
      })
      .addCase(resetOtpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.msg = action.payload.msg;
        state.success = true;
      })
      .addCase(resetOtpVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        state.msg = action.payload.msg;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.guestMode = payload.email === "guest@learnly.com";
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.msg = action.payload.msg;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.msg = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.msg = "Profile updated successfully.";
        state.error = false;
        state.profile = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.msg = action.payload.msg;
      })
      .addCase(becomeInstructor.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        state.msg = false;
      })
      .addCase(becomeInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.isAuthenticated = true;
        state.profile.role = "Instructor";
        Cookies.set("_token", action.payload.jwtToken, { expires: 30 });
        initialAuthenticate(false);
      })
      .addCase(becomeInstructor.rejected, (state, action) => {
        state.loading = false;
        state.msg = action.payload.msg;
      })
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishlistCourses = payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.wishlistLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, { payload }) => {
        state.wishlistLoading = false;
        state.profile.wishlist = payload;
      })
      .addCase(removeFromWishlist.pending, (state) => {
        state.wishlistLoading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, { payload }) => {
        state.wishlistLoading = false;
        state.profile.wishlist = payload;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cartCourses = payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.cartLoading = false;
        state.profile.cart = payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.cartLoading = false;
        state.profile.cart = payload;
      })
      .addCase(checkOut.pending, (state) => {
        state.checkOutLoading = true;
      })
      .addCase(checkOut.fulfilled, (state, { payload }) => {
        state.checkOutLoading = false;
        state.profile = payload;
      })
      .addCase(myLearning.pending, (state) => {
        state.loading = true;
      })
      .addCase(myLearning.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.enrolledCourses = payload;
      })
      .addCase(courseCurriculum.pending, (state) => {
        state.loading = true;
      })
      .addCase(courseCurriculum.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.learning = payload;
        state.progress = payload.progress;
        state.videosData = getVideoList(payload.course.curriculum);
      })
      .addCase(newReview.pending, (state) => {
        state.ratingLoading = true;
      })
      .addCase(newReview.fulfilled, (state) => {
        state.ratingLoading = false;
      })
      .addCase(updateReview.pending, (state) => {
        state.ratingLoading = true;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.ratingLoading = false;
      });
  },
});

export const { logout, authenticate, clear, setProgress, incProgress } =
  authSlice.actions;
export default authSlice.reducer;
