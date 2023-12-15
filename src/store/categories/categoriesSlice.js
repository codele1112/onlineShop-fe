import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    isLoading: false,
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state) => {
      state.isShowCart = state.isShowCart === false ? true : false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      // console.log("action", action);
      // state.errorMessage = action.payload.message;
      state.categories = null;
    });
  },
});

export const { showModal, showCart } = categoriesSlice.actions;
export default categoriesSlice.reducer;
