import React, { useState } from "react";
import * as Push from "@pushprotocol/restapi";
import { useRouter } from "next/router";

function Index() {
  const [localLoading, setLocalLoading] = useState(null);
  const handleChange = () => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleClick = async () => {
    const router = useRouter();
    router.push('/')
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
              name="tokenID"
              title="Token ID"
              value={data.tokenID}
              handleChange={handleChange}
              placeholder="Enter Token Identity"
              disabled={localLoading}
            />

            <div className="widthDiv">
              <button className="btn mintBtn" onClick={handleClick}>
                {localLoading ? (
                  <Loader height="25" width="25" />
                ) : (
                  "Get Product"
                )}
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
