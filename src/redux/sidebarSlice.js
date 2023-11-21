import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSidebar: true
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setShowSidebar: (state, action) => {
        if (state > 768) {
            setShowSidebar(true);
          } else {
            setShowSidebar(false);
          }
      },

  },
});

export const {setShowSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;
