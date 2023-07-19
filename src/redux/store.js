import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./ModalSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice
  },
})