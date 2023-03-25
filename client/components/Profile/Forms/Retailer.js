import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../Loader"
import InputBox from "../../InputBox"
import Error from "@/components/Error"
import Success from "@/components/Success"
import { registerRetailer } from "@/redux/slices/manufacturer"

import warrantyABI from "../../../assets/contract_data/warranty.json"
import warranty_contract_address from "../../../assets/contract_data/warrantyAddress.json"
import { setSuccess } from "@/redux/slices/success"
import { setError } from "@/redux/slices/error"

function Retailer() {
  const dispatch = useDispatch()
  const { walletAddress, instances, signer } = useSelector(
    (state) => state.navbar
  )
  const [data, setData] = useState({
    retailerAddress: ""
  })
  const [localLoading, setLocalLoading] = useState(false)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }
  const handleClick = async () => {
    try {
      console.log(warranty_contract_address, warrantyABI, signer)
      setLocalLoading(true)

      dispatch(registerRetailer(data.retailerAddress))
        .unwrap()
        .then(() => {
          setLocalLoading(false)
          dispatch(setSuccess("Retailer Registered Successfully."))
        })
      // const retailer = await instances.addRetailer(data.retailerAddress);
      // console.log(retailer);
      // console.log(`${walletAddress} associates with retailer: ${retailer}`);
      setData({ retailerAddress: "" })
    } catch (error) {
      setLocalLoading(false)
      setData({ retailerAddress: "" })
      console.error(error.message)
      dispatch(setError(error))
    }
  }
  return (
    <div className="dwar-form-container">
      <div className="dwar-form-main">
        <div className="txt">
          <h1>Register Retailers</h1>
        </div>
        <Error />

        <InputBox
          name="retailerAddress"
          title="Enter Retailer's Address"
          value={data.retailerAddress}
          handleChange={handleChange}
          placeholder="Retailer 0x...."
          disabled={localLoading}
        />

        <div className="form-submit">
          <button className="form-submit-button" onClick={handleClick}>
            {localLoading ? <Loader height="25" width="25" /> : "Register"}
          </button>
        </div>
      </div>
      <Success />
    </div>
  )
}

export default Retailer
