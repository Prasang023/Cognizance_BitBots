import React, { useState } from "react";
import * as Push from "@pushprotocol/restapi";
import { useDispatch } from "react-redux";
import InputBox from "@/components/InputBox";
import Success from "@/components/Success";
import Error from "@/components/Error";
import { useSigner } from "wagmi";
import { setSuccess } from "@/redux/slices/success";
import { setError } from "@/redux/slices/error";

function Sell() {
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
    // const hexTokenID = await instances.getProductId();
    // const tokenID = parseInt(hexTokenID, 16);

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
          body: `You have an activation request for ${1}`, //tokenID
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
    <>
      <div className="dwar-form-container">
        <div className="dwar-form-main">
          <div className="txt">
            <h1>Notify Customer</h1>
          </div>
          <Error />

          <InputBox
            name="recipient_address"
            title="Enter the Recipient Address"
            value={data.recipient_address}
            handleChange={handleChange}
            placeholder="Recipient 0x...."
            disabled={localLoading}
          />

          <div className="form-submit">
            <button className="form-submit-button" onClick={handleClick}>
              {localLoading ? <Loader height="25" width="25" /> : "Get Product"}
            </button>
          </div>
        </div>
        <Success />
      </div>
    </>
  );
}

export default Sell;
