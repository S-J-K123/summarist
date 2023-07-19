import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
        state.signUpModalOpen = false;
      },
  },
});

export const {openSignUpModal, closeSignUpModal} = ModalSlice.actions;

export default ModalSlice.reducer;
