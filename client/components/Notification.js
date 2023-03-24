import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import * as Push from "@pushprotocol/restapi";
import { payloads } from "@pushprotocol/restapi";

function Notification() {
  const [notification, setNotification] = useState(null);
  const [data, setData] = useState({
    title: "",
    body: "",
    recipient_address: "",
  });

  const { address } = useAccount();
  const PK = process.env.CHANNEL_KEY;
  const Pkey = `0x${PK}`;
  const channelAddress = "0x7eff959E7D7fB6b9F3cDA78599966870929A7628";

  const { data: signer } = useSigner(Pkey);

  useEffect(() => {
    const notification = async () => {
      const notifs = await Push.user.getFeeds({
        user: address,
        env: "staging",
        limit: 5,
        page: 1,
      });
      setNotification(notifs);
    };
    notification();
  }, []);

  console.log(notification);

  const sendNotifs = async () => {
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
          title: data.title,
          body: data.body,
          cta: "",
          img: "",
        },
        recipients: data.recipient_address,
        channel: channelAddress,
        env: "staging",
      });

      console.log("Notification Sent");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleClick = () => {
    console.log("click");
    sendNotifs();
    setData({ title: "", body: "", recipient_address: "" });
  };
  return (
    <div>
      <div className="showNotifs" style={{ color: "white" }}>
        {notification &&
          notification?.map((notifs) => (
            <li>
              {notifs.title}: {notifs.message}
            </li>
          ))}
      </div>
      <div className="sendNotifs" style={{ color: "white" }}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={handleChange}
        />
        <label htmlFor="message">Message: </label>
        <input
          type="text"
          name="body"
          id="body"
          value={data.body}
          onChange={handleChange}
        />
        <label htmlFor="recipient_address">Recipient Address: </label>
        <input
          type="text"
          name="recipient_address"
          id="address"
          value={data.recipient_address}
          onChange={handleChange}
        />
        <button className="btn" type="submit" onClick={handleClick}>
          Notify
        </button>
      </div>
    </div>
  );
}

export default Notification;
