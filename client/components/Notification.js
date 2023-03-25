import { useSigner } from "wagmi";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Push from "@pushprotocol/restapi";
import { setError } from "@/redux/slices/error";
import { setSuccess } from "@/redux/slices/success";

function Notification() {
  const dispatch = useDispatch();
  // const { instances } = useSelector((state) => state.navbar);

  const [data, setData] = useState({
    recipient_address: "",
  });

  const PK = process.env.CHANNEL_KEY;
  const Pkey = `0x${PK}`;
  const channelAddress = "0x7eff959E7D7fB6b9F3cDA78599966870929A7628";

  const { data: signer } = useSigner(Pkey);

  const sendNotifs = async () => {
    // const hexTokenID = await instances.getProductId();
    // const tokenID = parseInt(hexTokenID, 16);
    // console.log(tokenID);
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
          title: `Pending Warranty`,
          body: `You have recieved a request for ${0}, please activate the warranty`,
          cta: "",
          img: "",
        },
        recipients: data.recipient_address,
        channel: channelAddress,
        env: "staging",
      });
      dispatch(setSuccess("Notification Sent"));
    } catch (error) {
      dispatch(setError("Unable to Notify !!"));
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleClick = () => {
    sendNotifs();
  };
  return (
    <div>
      <div className="sendNotifs" style={{ color: "white" }}>
        <label htmlFor="recipient_address">Recipient Address: </label>
        <input
          type="text"
          name="recipient_address"
          id="address"
          value={data.recipient_address}
          onChange={handleChange}
        />
        <button className="btn" type="submit" onClick={handleClick}>
          Sell
        </button>
      </div>
    </div>
  );
}

export default Notification;
