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
import {
  mintWarrantyNft,
  activateWarranty,
  transferNft,
  resellProduct,
} from "@/redux/slices/customer";
import Image from "next/image";
import { setSuccess } from "@/redux/slices/success";

function Card({ data }) {
  const dispatch = useDispatch();
  const { signer } = useSelector((state) => state.navbar);

  const [info, setInfo] = useState({
    address: "",
  });

  console.log(data);
  const handleChange = (e) => {
    setInfo({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const activateBtnClick = (token) => {
    console.log("token", token);
    var convertedId = parseInt(token._hex, 16);

    // let qrNftTx = await instances.safeMint("Token Sent !", data.tokenID);
    // console.log("Mining...", qrNftTx);
    // Status
    // let tx = await qrNftTx.wait();
    // console.log("Mined QR Transaction !", tx);
    // setLocalLoading(false);
    // console.log(
    // `Mined, see transaction: https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`
    // );
    dispatch(mintWarrantyNft({ uri: "Warranty NFT", tokenId: convertedId }))
      .unwrap()
      .then(() => dispatch(activateWarranty(convertedId, info.address)));
  };

  const resell = (token) => {
    var convertedId = parseInt(token._hex, 16);
    dispatch(transferNft({ id: convertedId, add: info.address }))
      .unwrap()
      .then(() => {
        dispatch(resellProduct({ id: convertedId, to: info.address }))
          .unwrap()
          .then(() => {
            dispatch(setSuccess("Product sold Successfully!"));
          });
      });
  };
  const getExpiry = (unix) => {
    const t = new Date(unix);
    console.log(t);
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    return d.setUTCSeconds(unix);
  };

  return (
    <div className="card">
      <div className="photo-card">
        <Image width="150" height="150" src={data[2]} />
      </div>
      <div className="text-box">
        <h4>{data[0]}</h4>
        <p>{data[3]}</p>
        <p>Manufacturer: {data[6]}</p>
        <p>Retailer: {data[7]}</p>
        <p>Owner: {data[8]}</p>

        <p>Expires in {parseInt(data[5]._hex, 16)}</p>
      </div>
      <div className="btn-box">
        {data[9] == 1 ? (
          <button onClick={() => activateBtnClick(data[1])}>Activate</button>
        ) : null}
        {data[9] == 2 ? (
          <div className="btn-box-col">
            <input
              type="text"
              name="address"
              value={info.address}
              onChange={handleChange}
            />
            <button onClick={() => resell(data[1])}>Resell</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Card;
