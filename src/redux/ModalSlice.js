import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModalOpen: false,
  signUpModalOpen: false,
  resetModalOpen: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
   toggleLoginModal: (state) => {
state.loginModalOpen = !state.loginModalOpen
   },
   toggleSignUpModal: (state) => {
    state.signUpModalOpen = !state.signUpModalOpen
       },
       toggleResetModal: (state) => {
        state.resetModalOpen = !state.resetModalOpen
           },
      
  
  },
});

export const {toggleLoginModal, toggleSignUpModal, toggleResetModal} = ModalSlice.actions;

export default ModalSlice.reducer;
