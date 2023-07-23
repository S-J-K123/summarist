import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./ModalSlice"
import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice
  },
})