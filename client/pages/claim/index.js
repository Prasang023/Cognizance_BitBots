import Error from "@/components/Error";
import React, { useState, useRef } from "react";
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";
import { create } from "ipfs-http-client";
import { Web3Storage } from "web3.storage";
import InputBox from "@/components/InputBox";
import { setError } from "@/redux/slices/error";
import { setSuccess } from "@/redux/slices/success";
import { useDispatch, useSelector } from "react-redux";
import warranty_contract_address from "../../assets/contract_data/warrantyAddress.json";
import Success from "@/components/Success";
import { QRCodeCanvas } from "qrcode.react";

const project_id = "2LaElUcAr2SYK3KuPpor7Xlc5hB";
const project_secret = "0947f1f7854b4631c685a30c20e51d4d";

function Index() {
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const [data, setData] = useState({
    tokenID: "",
  });
  const { walletAddress, instances } = useSelector((state) => state.navbar);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = async () => {
    let qrNftTx = await instances.safeMint("Token Sent !", data.tokenID);
    console.log("Mining...", qrNftTx);
    // Status
    let tx = await qrNftTx.wait();
    console.log("Mined QR Transaction !", tx);
    setLocalLoading(false);
    console.log(
      `Mined, see transaction: https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`
    );
  };

  return (
    <div>
      <Layout>
        <div className="authContainer">
          <div className="authcenter">
            <div>
              <div className="txt">
                <h1 style={{ margin: "10px 0px" }}>Mint Product Details</h1>
              </div>
              <Error />

              <InputBox
                name="tokenID"
                title="Token ID"
                value={data.tokenID}
                handleChange={handleChange}
                placeholder="Enter Token ID"
                disabled={localLoading}
              />

              <div className="widthDiv">
                <button className="btn mintBtn" onClick={handleClick}>
                  {localLoading ? <Loader height="25" width="25" /> : "Claim"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Success />
      </Layout>
    </div>
  );
}

export default Index;
