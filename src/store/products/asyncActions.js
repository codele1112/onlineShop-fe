import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getNewProducts = createAsyncThunk(
  "product/newProducts",
  async (data, { rejectWithValue }) => {
    const response = await apis.getProducts();
    // console.log("res", response);
    // console.log(response.success);
    // console.log(response.data);

    if (!response.success) return rejectWithValue(response);
    return response.data.products;
  }
);
