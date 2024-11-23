import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all videos
export const getAllVideos = createAsyncThunk(
  "getAllVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rajantube-1.onrender.com/video`
      );
      return response.data; // Returning data as-is
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// views api call

export const viewAPIcall = createAsyncThunk(
  "viewAPIcall",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("L_token");
      const response = await axios.put(
        `https://rajantube-1.onrender.com/video/views/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      // console.log("view res:",response)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// subscribe api handle

export const subscribeAPIcall = createAsyncThunk(
  "subscribeAPIcall",
  async (id, { rejectWithValue }) => {
    try {
      console.log("try",id)
      const token = localStorage.getItem("L_token");
      const response = await axios.put(
        `https://rajantube-1.onrender.com/user/subscribe/${id}`,
        {}, // Empty body, if no data is to be sent
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log("Subscribe response:", response.data);
      return response.data; // Return the response data
    } catch (error) {
      console.log("error",id)
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);




// create for ALL users

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://rajantube-1.onrender.com/user`);

      return response.data; // Returning data as-is
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// get own video (means malik ka video jisane upload kiya hai bas usak)
export const ownAllVideos = createAsyncThunk(
  "ownAllVideos",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("L_token");
      console.log(token);
      const response = await axios.get(
        `https://rajantube-1.onrender.com/video/own-video`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log("My", response);
      return response.data; // Returning data as-is
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// delete own video
export const deleteVideo = createAsyncThunk(
  "deleteVideo",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("L_token");
      const response = await axios.delete(
        `https://rajantube-1.onrender.com/video/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      console.log("My", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const videoDetailsSlice = createSlice({
  name: "videoDetails",
  initialState: {
    allUsers: [],
    allVideos: [],
    history: [],
    ownerVideo: [],
    loading: false,
    error: null,
    side: false,
  },
  reducers: {
    clearHistory: (state) => {
      state.history = [];
    },
    addToHistory: (state, action) => {
      const video = action.payload;
      console.log(video);
      const videoExists = state.history.some((item) => item == video);

      if (!videoExists) {
        state.history = [...state.history, video];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error when loading starts
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.allVideos = action.payload || []; // Use `data` field
      })
      .addCase(getAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ownAllVideos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ownAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.ownerVideo = action.payload;
      })
      .addCase(ownAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error when loading starts
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.Allusers || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHistory, addToHistory } = videoDetailsSlice.actions; // Export actions
export default videoDetailsSlice.reducer; // Export reducer
