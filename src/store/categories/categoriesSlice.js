import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./asyncActions";
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      // console.log("action", action);
      state.errorMessage = action.payload.message;
    });
  },
});

export const { showModal } = categoriesSlice.actions;
export default categoriesSlice.reducer;
