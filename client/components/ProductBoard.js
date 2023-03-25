import React, { useState } from "react";
import * as Push from "@pushprotocol/restapi";
import { useDispatch } from "react-redux";
// import Success from "@/components/Success";
// import Error from "@/components/Error";
import { useSigner } from "wagmi";
import { setSuccess } from "@/redux/slices/success";
import { setError } from "@/redux/slices/error";
import InputBox from "./InputBox";

function ProductBoard({ scannedData }) {
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(null);
  const [data, setData] = useState({
    recipient_address: "",
  });

  const PK = process.env.CHANNEL_KEY;
  const Pkey = `0x${PK}`;
  const channelAddress = "0x7eff959E7D7fB6b9F3cDA78599966870929A7628";

  const { data: signer } = useSigner(Pkey);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = async () => {
    try {
      await Push.payloads.sendNotification({
        signer,
        type: 3, //target
        identityType: 2, //direct payloads
        notification: {
          title: "New Notification Alert",
          body: "Message!",
        },
        payload: {
          title: `Pending Notification 📌`,
          body: `You have an activation request for ${scannedData}`, //tokenID
          cta: "",
          img: "",
        },
        recipients: data.recipient_address,
        channel: channelAddress,
        env: "staging",
      });
      dispatch(setSuccess("Notification Sent"));
      setData({ recipient_address: "" });
    } catch (error) {
      setData({ recipient_address: "" });
      dispatch(setError("Unable to notify !", error.message));
    }
  };
  return (
    <div className="product-detail-box">
      <div className="photo"></div>
      <div className="box">
        <p>Name</p>
        <div className="child">
          <p>Title</p>
        </div>
      </div>
      <div className="box">
        <p>Activate time</p>
        <div className="child">
          <p>1-2-2002</p>
        </div>
      </div>
      <div className="box">
        <p>Product status</p>
        <div className="child">
          <p>Ma chudae</p>
        </div>
      </div>
      <InputBox
        name="recipient_address"
        title="Enter the Recipient Address"
        value={data.recipient_address}
        handleChange={handleChange}
        placeholder="Recipient 0x...."
        disabled={localLoading}
      />
      <div className="box button" onClick={handleClick}>
        <p>Sell Product</p>
      </div>
    </div>
  );
}

export default ProductBoard;
