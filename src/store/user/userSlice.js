import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    errorMessage: "",
    current: null,
    token: null,
    isLoading: false,
  },
  reducers: {
    userLogin: (state, action) => {
      // console.log("action", action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    userLogout: (state, action) => {
      // console.log("action".action);
      state.isLoggedIn = false;
      state.token = null;
    },
    // updateCart:(state,action) =>{
    //   state.
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
    });

    builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
    });
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
