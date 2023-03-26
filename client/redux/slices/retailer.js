import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setError } from "./error"

export const getProductDetailsById = createAsyncThunk(
  "retailer/getProductDetailsById",
  async (id, thunkAPI) => {
    try {
      console.log("chalgya")
      const response = await thunkAPI
        .getState()
        .navbar.instances.getProductDetails(id)

      console.log("Product Details: ", response)

      return response
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const sellProduct = createAsyncThunk(
  "retailer/sellProduct",
  async (data, thunkAPI) => {
    try {
      const response = await thunkAPI
        .getState()
        .navbar?.instances?.sellProduct(data.id, data.add)

      console.log("Sell: ", response)

      return response
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const retailerSlice = createSlice({
  name: "retailer",
  initialState: {
    loading: false,
    error: null,
    productDetail: null
  },
  reducers: {},
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true
      state.error = null
    }
    function onRejection(state, action) {
      state.loading = false
      state.error = action.payload
    }
    builder.addCase(getProductDetailsById.fulfilled, (state, action) => {
      state.loading = false
      state.productDetail = action.payload
    })
    builder.addCase(sellProduct.fulfilled, (state, action) => {
      state.loading = false
    })
    builder
      .addCase(getProductDetailsById.pending, onPending)
      .addCase(sellProduct.pending, onPending)
    builder
      .addCase(getProductDetailsById.rejected, onRejection)
      .addCase(sellProduct.rejected, onRejection)
  }
})

// export const { clearData } = manufacturerSlice.actions
export default retailerSlice.reducer
