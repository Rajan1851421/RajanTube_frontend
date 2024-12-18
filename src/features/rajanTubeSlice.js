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
      return response.data;
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
            Authorization: `Bearer ${token}`,
          },
        }
      )     
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
      const token = localStorage.getItem("L_token");
      const response = await axios.put(
        `https://rajantube-1.onrender.com/user/subscribe/${id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
        console.log("Subscribe response:", response.data);
      return response.data; 
    } catch (error) {      
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const UnsubscribeAPIcall = createAsyncThunk(
  "UnsubscribeAPIcall",
  async (id, { rejectWithValue }) => {
    try {     
      const token = localStorage.getItem("L_token");
      const response = await axios.put(
        `https://rajantube-1.onrender.com/user/unsubscribe/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log("un Subscribe:", response.data);
      return response.data; 
    } catch (error) {
      
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

// get own video (means malik ka video jisane upload kiya hai bas usaka)
export const ownAllVideos = createAsyncThunk(
  "ownAllVideos",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("L_token");     
      const response = await axios.get(
        `https://rajantube-1.onrender.com/video/own-video`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );    
      return response.data;
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
            Authorization: `Bearer ${token}`,
          },
        }
      )    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// get all comments by usier id
export const getAllCommentAPI = createAsyncThunk(
  "getAllCommentAPI",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rajantube-1.onrender.com/comment/${id}`
      )
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addCommentAPI = createAsyncThunk(
  "addCommentAPI",
  async ({ id, commentText }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("L_token");
      const response = await axios.post(
        `https://rajantube-1.onrender.com/comment/new-comment/${id}`,
        { commentText }, // Body of the request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      )      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// get all comment for public view





export const publiccomments = createAsyncThunk(
  "publiccomments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rajantube-1.onrender.com/comment`
      )       
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Action to update comment by ID
export const commentUpdateByCmtid =
  ({ id, formData }) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("L_token");
      const response = await axios.put(
        `https://rajantube-1.onrender.com/comment/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "rajanTube/updateComment",
        payload: response.data, 
      });      
      return response.data;
    } catch (error) {      
      throw error;
    }
  };

  export const deleteComment = createAsyncThunk(
    "deleteComment",
    async (id, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("L_token");
        const response = await axios.delete(
          `https://rajantube-1.onrender.com/comment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
          console.log("My delete", response);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );

const videoDetailsSlice = createSlice({
  name: "videoDetails",
  initialState: {
    publicComments:[],
    allUsers: [],
    allVideos: [],
    history: [],
    playlist: [],
    ownerVideo: [],
    loading: false,
    error: null,
    side: false,
    status: null,
    allComment: [],
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload; 
    },
    clearHistory: (state) => {
      state.history = [];
    },
    addToHistory: (state, action) => {
      const video = action.payload;
       //  console.log(video);
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
      })
      .addCase(subscribeAPIcall.pending, (state) => {
        state.loading = true;
      })
      .addCase(subscribeAPIcall.fulfilled, (state) => {
        state.loading = false;
        state.status = "Subcribed";
      })
      .addCase(subscribeAPIcall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCommentAPI.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllCommentAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.allComment = action.payload;
      })
      .addCase(getAllCommentAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(publiccomments.pending,(state,action)=>{
        state.loading = true;
      })
      .addCase(publiccomments.fulfilled,(state,action)=>{
        state.loading = false;
        state.publicComments = action.payload;
      })
      .addCase(publiccomments.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload;
      })      
  },
});

export const { clearHistory, addToHistory,setStatus  } = videoDetailsSlice.actions; // Export actions
export default videoDetailsSlice.reducer; // Export reducer
