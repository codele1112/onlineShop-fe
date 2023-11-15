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
    currentCart: [],
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
      state.current = null;
      state.isLoading = false;
      state.errorMessage = "";
    },
    clearMessage: (state) => {
      state.errorMessage = "";
    },
    updateCart: (state, aciton) => {
      // console.log("action");
      const { pid, quantity } = aciton.payload;
      const updateItem = state.currentCart.find(
        (el) => el.product?._id === pid
      );
      if (updateItem) updateItem.quantity = quantity;
      else state.errorMessage = "Please try it later.";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
      state.currentCart = action.payload.cart;
    });

    builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.errorMessage = "Login session has expired. Please login again.";
    });
  },
});

export const { userLogin, userLogout, clearMessage, updateCart } =
  userSlice.actions;
export default userSlice.reducer;
