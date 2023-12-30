import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    newProducts: null,
    errorMessage: "",
    isLoading: false,
    dealDaily: null,
  },

  reducers: {
    getDealDaily: (state, action) => {
      state.dealDaily = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getNewProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });

    builder.addCase(actions.getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
export const { getDealDaily } = productsSlice.actions;
export default productsSlice.reducer;
