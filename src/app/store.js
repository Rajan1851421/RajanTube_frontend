// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import videoDetails from "../features/rajanTubeSlice"; // Assuming video details slice
import sidebarSlice from "../features/SidebarSlice"; // Sidebar slice
import playlistSlice from "../features/playListSlice"; // Playlist slice

// Configuring the Redux store
export const store = configureStore({
  reducer: {
    rajanTube: videoDetails, // Video-related state
    sidebar: sidebarSlice, // Sidebar-related state
    playlist: playlistSlice, // Playlist-related state
  },
});
