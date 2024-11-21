import { configureStore } from "@reduxjs/toolkit";
import videoDetails from "../features/rajanTubeSlice";
export const store = configureStore({
    reducer: {
      rajanTube : videoDetails,
    },
  })