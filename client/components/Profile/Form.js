import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import InputBox from "../InputBox";

function Form() {
  const dispatch = useDispatch();
  const { walletAddress, instances, signer } = useSelector(
    (state) => state.navbar
  );
  const [data, setData] = useState({
    retailerAddress: "",
  });
  const [localLoading, setLocalLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };
  const handleClick = async () => {
    try {
      console.log(warranty_contract_address, warrantyABI, signer);
      setLocalLoading(true);

      dispatch(registerRetailer(data.retailerAddress));
      const retailer = await instances.addRetailer(data.retailerAddress);

      console.log(`${walletAddress} associates with retailer: ${retailer}`);
      setLocalLoading(false);
    } catch (error) {
      setLocalLoading(false);
      console.error(error.message);
    }
  };
  return (
    <div className="dwar-form-container">
      <div className="dwar-form-main">
        <div className="txt">
          <h1>Register Retailers</h1>
        </div>
        <InputBox
          name="retailerAddress"
          title="Enter Retailer's Address"
          value={data.retailerAddress}
          handleChange={handleChange}
          placeholder="User Address as Retailer"
          disabled={localLoading}
        />

        <div className="form-submit">
          <button className="form-submit-button" onClick={handleClick}>
            {localLoading ? <Loader height="25" width="25" /> : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
