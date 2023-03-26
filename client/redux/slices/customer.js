import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setError } from "./error"

export const getProducts = createAsyncThunk(
  "customer/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await thunkAPI.getState().navbar.instances.getProducts()

      console.log("Products: ", response)

      return response
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const mintWarrantyNft = createAsyncThunk(
  "customer/mintWarrantyNft",
  async (data, thunkAPI) => {
    try {
      console.log("minting in redux")
      const response = await thunkAPI
        .getState()
        .navbar.instances.safeMint(data.uri, data.tokenId)

      console.log("Products minted in redux: ", response)

      return response
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const activateWarranty = createAsyncThunk(
  "customer/activateWarranty",
  async (data, thunkAPI) => {
    try {
      const response = await thunkAPI
        .getState()
        .navbar.instances.activateWarranty(data)

      console.log("Warranty activated: ", response)

      return response
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const transferNft = createAsyncThunk(
  "customer/transferNft",
  async (data, thunkAPI) => {
    try {
      console.log("transfer hoga", data)
      const response = await thunkAPI
        .getState()
        .navbar.instances?.transferNFT(data.id, data.add)

      console.log("Warranty transfered: ", response)

      return response
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const resellProduct = createAsyncThunk(
  "customer/resellProduct",
  async (data, thunkAPI) => {
    try {
      console.log("resell hoga")
      const response = await thunkAPI
        .getState()
        .navbar.instances.resellProduct(data.id, data.to)

      console.log("NFT sold again ", response)

      return response
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    allProducts: [],
    error: null
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
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload
      state.loading = false
    })
    builder.addCase(mintWarrantyNft.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(activateWarranty.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(transferNft.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(resellProduct.fulfilled, (state, action) => {
      state.loading = false
    })
    builder
      .addCase(getProducts.pending, onPending)
      .addCase(mintWarrantyNft.pending, onPending)
      .addCase(activateWarranty.pending, onPending)
      .addCase(transferNft.pending, onPending)
      .addCase(resellProduct.pending, onPending)
    builder
      .addCase(getProducts.rejected, onRejection)
      .addCase(mintWarrantyNft.rejected, onRejection)
      .addCase(activateWarranty.rejected, onRejection)
      .addCase(transferNft.rejected, onRejection)
      .addCase(resellProduct.rejected, onRejection)
  }
})

// export const { setError, clearError } = errorSlice.actions;
export default customerSlice.reducer
