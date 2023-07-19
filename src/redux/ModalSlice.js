import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModalOpen: false,
  signUpModalOpen: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
        state.loginModalOpen = false;
      },
      openSignUpModal: (state) => {
        state.signUpModalOpen = true;
      },
      closeSignUpModal: (state) => {
          state.signUpModalOpen = false;
        },
  },
});

export const {openSignUpModal, closeSignUpModal, openLoginModal, closeLoginModal} = ModalSlice.actions;

export default ModalSlice.reducer;
