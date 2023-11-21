import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./ModalSlice"
import userSlice from "./userSlice"
import searchResults from "./searchSlice";
import sidebarSlice from "./sidebarSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    searchResults: searchResults,
    sidebar: sidebarSlice,
  },
})