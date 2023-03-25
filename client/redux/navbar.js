import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const checkUser = createAsyncThunk(
  "navbar/checkUser",
  async (data, thunkAPI) => {
    try {
      console.log("check User called successfully")

      const response = await data.checkUser()

      console.log("User: ", response)

      return parseInt(response._hex, 16)
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navbarMobile: false,
    walletAddress: null,
    signer: null,
    instances: null,
    warrenty_contract_address: null,
    savedId: null,
    userRole: null
  },
  reducers: {
    changeNavbarState: (state) => {
      state.navbarMobile = !state.navbarMobile
    },
    saveAddressAndSigner: (state, action) => {
      state.walletAddress = action.payload.address
      state.signer = action.payload.signer
      state.instances = action.payload.instances
      // state.nftInstances = action.payload.nftInstances;
    },
    addContractAddresses: (state, action) => {
      // state.DL_contract_address = action.payload.DL_contract_address;
      state.warrenty_contract_address = action.payload.warrenty_contract_address
    },
    saveId: (state, action) => {
      state.savedId = action.payload
    },
    deleteId: (state) => {
      state.savedId = null
    },
    clearNavbar: (state) => {
      state.walletAddress = null
      state.signer = null
      state.instances = null
      state.userRole = null
    }
  },
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true
      state.error = null
    }
    function onRejection(state, action) {
      state.loading = false
      state.error = action.payload
    }
    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.userRole = action.payload
      state.loading = false
    })
    builder.addCase(checkUser.pending, onPending)
    builder.addCase(checkUser.rejected, onRejection)
  }
})

export const {
  changeNavbarState,
  saveAddressAndSigner,
  addContractAddresses,
  saveId,
  deleteId,
  clearNavbar
} = navbarSlice.actions

export default navbarSlice.reducer
