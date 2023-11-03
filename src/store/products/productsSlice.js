import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./asyncActions";
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload.message);
      state.errorMessage = action.payload.message;
    });
  },
});

export default productsSlice.reducer;
