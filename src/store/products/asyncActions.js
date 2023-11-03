import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getProducts = createAsyncThunk(
  "app/products",
  async (data, { rejectWithValue }) => {
    const response = await apis.getProducts();
    // console.log("res", response);
    // console.log(response.data.success);

    if (!response.data.success) return rejectWithValue(response);
    return response.data.data;
  }
);
