import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCurrentUser = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    const response = await apis.getCurrentUser();
    // console.log("response", response);

    if (!response.success) return rejectWithValue(response);
    return response.data;
  }
);
