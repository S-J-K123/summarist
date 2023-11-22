
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setShowSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
