
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    clearSearchResults: (state) => {
      return [];
    },
    setSearchResults: (state, action) => {
      return action.payload;
    },
  },
});

export const { clearSearchResults, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;


