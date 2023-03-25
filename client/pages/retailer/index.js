import Error from "@/components/Error";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Success from "@/components/Success";
import InputBox from "@/components/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { registerRetailer } from "@/redux/slices/manufacturer";

import warrantyABI from "../../assets/contract_data/warranty.json";
import warranty_contract_address from "../../assets/contract_data/warrantyAddress.json";

function Index() {
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
    <div>
      <Layout>
        <div className="authContainer">
          <div className="authcenter">
            <div className="txt">
              <h1 style={{ margin: "10px 0px" }}>Register Retailers</h1>
            </div>
            <Error />
            <InputBox
              name="retailerAddress"
              title="Enter Retailer's Address"
              value={data.retailerAddress}
              handleChange={handleChange}
              placeholder="User Address as Retailer"
              disabled={localLoading}
            />

            <div className="widthDiv">
              <button className="btn mintBtn" onClick={handleClick}>
                {localLoading ? <Loader height="25" width="25" /> : "Register"}
              </button>
            </div>
          </div>
        </div>
        <Success />
      </Layout>
    </div>
  );
}

export default Index;
