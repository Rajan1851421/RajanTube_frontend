import { configureStore } from "@reduxjs/toolkit";
import videoDetails from "../features/rajanTubeSlice";
import sidebarSlice from "../features/SidebarSlice";
export const store = configureStore({
    reducer: {
      rajanTube : videoDetails,
      sidebar:sidebarSlice,
    },
  })