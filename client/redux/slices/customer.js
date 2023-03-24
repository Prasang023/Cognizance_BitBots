import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "./error";

import axios from "axios";

export const getProducts = createAsyncThunk(
  "customer/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await thunkAPI.state.navbar.instances.getProducts();

      console.log("Products: ", response);

      return response;
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message));
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true;
      state.error = null;
    }
    function onRejection(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.retailers = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.pending, onPending);
    builder.addCase(getProducts.rejected, onRejection);
  },
});

// export const { setError, clearError } = errorSlice.actions;
export default customerSlice.reducer;
