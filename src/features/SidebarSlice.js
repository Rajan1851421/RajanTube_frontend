import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        side: false, 
    },
    reducers: {
        handleSidebar: (state) => {
            state.side = !state.side; 
        },
    },
});

export const { handleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
