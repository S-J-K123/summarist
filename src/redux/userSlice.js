import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { resolve } from "path";
import { useEffect } from "react";



// interface CustomUser {
//   uid: string | null;
//   email: string | null;
//   subscriptionPlan: any;
// }


// interface AuthState {
//   user: CustomUser | null;
//   isUserAuth: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   isUserAuth: false,
// }

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async(_, {dispatch}) => {
    const auth = getAuth();
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await user.getIdToken(true);
          const decodedToken = await getIdTokenResult(user);

          const userObj = {
            uid: user.uid,
            email: user.email,
            subscriptionPlan: decodedToken.claims.stripeRole,
          };
          dispatch(setUser(userObj));
          dispatch(setIsUserAuth(true))
        } else {
          dispatch(setUser(null));
          dispatch(setIsUserAuth(false))
        }
        resolve();
      })
    })
  }
)



const initialState = {
  username: null,
  name: null,
  email: null,
  uid: null,
  photoURL: null,
  user: null,
  isUserAuth: false,
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
    setIsUserAuth: (state, action) => {
      state.isUserAuth = action.payload;
    },
  },
});

export const { setUser, signOutUser, setIsUserAuth } = userSlice.actions;

export default userSlice.reducer;
