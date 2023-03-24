import { ethers } from "ethers";
import React, { useState } from "react";
import Error from "@/components/Error";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import { create } from "ipfs-http-client";
import Success from "@/components/Success";
import InputBox from "@/components/InputBox";
import { useSelector, useDispatch } from "react-redux";
import warrantyABI from "../../assets/contract_data/warranty.json";
import warranty_contract_address from "../../assets/contract_data/warrantyAddress.json";

const project_id = "2LaElUcAr2SYK3KuPpor7Xlc5hB";
const project_secret = "0947f1f7854b4631c685a30c20e51d4d";

function Index() {
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const { signer } = useSelector((state) => state.navbar);
  const { walletAddress } = useSelector((state) => state.navbar);
  const [data, setData] = useState({
    toAddress: "",
    tokenId: null,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    let newData;

    newData = {
      ...newData,
      owner: data.toAddress,
    };

    const auth =
      "Basic " +
      Buffer.from(project_id + ":" + project_secret).toString("base64");
    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      apiPath: "/api/v0",
      headers: {
        authorization: auth,
      },
    });

    setLocalLoading(false);
    client
      .add(JSON.stringify(newData))
      .then(async (res) => {
        console.log("result", `https://ipfs.io/ipfs/${res.path}`);
        const dataIpfs = `https://ipfs.io/ipfs/${res.path}`;
        console.log("address", walletAddress);
        console.log("dataIPFS of new data:", dataIpfs);
      })
      .catch((err) => {
        console.error(err.message);
      });

    console.log(warranty_contract_address, warrantyABI, signer);
    const contract = new ethers.Contract(
      warranty_contract_address.address,
      warrantyABI.abi,
      signer
    );
    setLocalLoading(true);
    console.log(contract);

    const currentOwner = await contract.ownerOf(data.tokenId);
    setLocalLoading(true);
    console.log(currentOwner);

    let qrNftTransfer = await contract.transferFrom(
      currentOwner,
      data.toAddress,
      data.tokenId
    );
    setLocalLoading(true);
    console.log(qrNftTransfer);

    await qrNftTransfer.wait();
    setLocalLoading(false);
    console.log(
      `NFT${data.tokenId} Transfered from ${currentOwner} to ${data.toAddress}`,
      qrNftTransfer
    );
  };
  return (
    <div>
      <Layout>
        <div className="authContainer">
          <div className="authcenter">
            <div className="txt">
              <h1 style={{ margin: "10px 0px" }}>Transfer Details</h1>
            </div>
            <Error />
            <InputBox
              name="toAddress"
              title="Transfer to Address"
              value={data.toAddress}
              handleChange={handleChange}
              placeholder="Enter Transfer Address"
              disabled={localLoading}
            />
            <InputBox
              name="tokenId"
              title="NFT Token ID"
              value={data.tokenId}
              handleChange={handleChange}
              placeholder="Enter NFT Token ID"
              disabled={localLoading}
            />

            <div className="widthDiv">
              <button className="btn mintBtn" onClick={handleClick}>
                {localLoading ? <Loader height="25" width="25" /> : "Transfer"}
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
