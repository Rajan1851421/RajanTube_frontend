// src/redux/playlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    playlist: [], // Stores video IDs
};

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        addToPlaylist: (state, action) => {
            const videoId = action.payload; // Expecting a video ID
            console.log("Adding video ID to playlist:", videoId);

            // Check if the video already exists in the playlist
            const videoExists = state.playlist.some((item) => item === videoId);

            if (!videoExists) {
                state.playlist = [...state.playlist, videoId];
                console.log("Updated playlist:", state.playlist);
            } else {
                console.log("Video already exists in the playlist");
            }
        },
        // Add more reducers if needed (like removeFromPlaylist, clearPlaylist, etc.)
    },
});

export const { addToPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
