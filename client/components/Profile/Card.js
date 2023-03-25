import { ethers } from "ethers";
import React, { useState } from "react";
// import Error from "@/components/Error";
// import Layout from "@/components/Layout";
// import Loader from "@/components/Loader";
import { create } from "ipfs-http-client";
// import Success from "@/components/Success";
// import InputBox from "@/components/InputBox";
import { useSelector, useDispatch } from "react-redux";
import warrantyABI from "../../assets/contract_data/warranty.json";
import warranty_contract_address from "../../assets/contract_data/warrantyAddress.json";

function Card({ data }) {
  console.log(data);
  const { signer } = useSelector((state) => state.navbar);
  // const [data, setData] = useState({
  //   toAddress: "",
  //   tokenId: null,
  // });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const Activate = async () => {
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

  const Resell = async () => {
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
    <div className="card">
      <div className="photo-card"></div>
      <div className="text-box">
        <h4>{data.heading}</h4>
        <p>{data.para}</p>
      </div>
      <div className="btn-box">
        <button onClick={Activate}>Activate</button>
        <button onClick={Resell}>Resell</button>
      </div>
    </div>
  );
}

export default Card;
