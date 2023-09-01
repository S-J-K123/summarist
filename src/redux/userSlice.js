import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  name: null,
  email: null,
  uid: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },

    signOutUser: (state, action) => {
      state.email = action.payload;
      state.uid = action.payload;
    },
  },
});

export const { setUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
