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
  const [qrImg, setQrImg] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const qrRef = useRef();
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhQTQzM0RkY2M4QzM5YWJFQzdmNzZDM2REQjlFOTBhMWY3RTk2RjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkxMjcxMDk3NjMsIm5hbWUiOiJsZW5kTmZ0In0.7Zu-wSF34-7GlU5rVIXAvrIczw6MQYT4yV7vOVU9pis`;
  const storage = new Web3Storage({ token: token });
  const { walletAddress, instances } = useSelector((state) => state.navbar);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  function downloadPNG(filename) {
    console.log("downloadPNG called");
    const linkSource = qrImg;
    const downloadLink = document.createElement("a");
    const fileName = filename + ".png";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    console.log("PNG link: ", downloadLink);
    downloadLink.click();
  }

  const nftUpload = (e) => {
    e.preventDefault();
    setLocalLoading(true);

    const nFile = e.target.files;
    console.log(nFile);
    storage
      .put(nFile)
      .then((res) => {
        console.log(res);
        setLocalLoading(false);
        setData({
          ...data,
          image: `https://ipfs.io/ipfs/${res}/${nFile[0].name}`,
        });
        dispatch(setSuccess("Uploaded"));
      })
      .catch((err) => {
        setLocalLoading(false);
        dispatch(setError(err.message));
      });
    console.log(data.image);
  };

  const addData = async () => {
    console.log("clicked");
    let id = await instances.getProductId();
    let editedData = {
      ...data,
      id: Number(id.toString()),
    };
    id = Number(id.toString());
    console.log("ID added", id);

    setLocalLoading(false);

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

    setLocalLoading(true);
    client.add(JSON.stringify(data)).then(async (response) => {
      console.log("result", `https://ipfs.io/ipfs/${response.path}`);
      const dataIpfs = `https://ipfs.io/ipfs/${response.path}`;
      console.log("addresss", walletAddress);
      console.log("dataIPFS of uploaded QR", dataIpfs);
      setLocalLoading(true);

      let qrNftTx = await instances.safeMint(walletAddress, dataIpfs);
      console.log("Mining...", qrNftTx);
      // Status
      let tx = await qrNftTx.wait();
      console.log("Mined QR Transaction !", tx);
      setLocalLoading(false);
      console.log(
        `Mined, see transaction: https://mumbai.polygonscan.com/tx/${qrNftTx.hash}`
      );
    });
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={`https://voices.uchicago.edu/201702busn3910001/2018/04/23/pitch-blockchain-in-the-supply-chain/`}
      size={300}
      bgColor={"#fff"}
      level={"H"}
    />
  );
  return (
    <div>
      <Layout>
        <div className="authContainer">
          <div className="authcenter">
            {qrImg ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    color: "white",
                    width: "180px",
                    margin: "8px 0px",
                  }}
                >
                  Minted QR Code for the Product
                </h2>
                <Image
                  src={qrImg}
                  width={150}
                  height={150}
                  alt="QR"
                  style={{
                    margin: "8px 0px",
                  }}
                />
                <button
                  className="btn"
                  onClick={() => downloadPNG("Minted-qr")}
                >
                  Download
                </button>
              </div>
            ) : (
              <>
                <div className="txt">
                  <h1 style={{ margin: "10px 0px" }}>Mint Product Details</h1>
                </div>
                <Error />
                <InputBox
                  name="image"
                  type="file"
                  title="Select Image"
                  value={data.imgInput}
                  handleChange={nftUpload}
                  placeholder="Item Name"
                  disabled={localLoading}
                />
                {/* <Videos handleChange={handleChange} /> */}
                <InputBox
                  name="title"
                  title="Title"
                  value={data.title}
                  handleChange={handleChange}
                  placeholder="Item Name"
                  disabled={localLoading}
                />

                <label className="inputLabel">
                  Description:
                  <textarea
                    className="inputBox"
                    name="description"
                    value={data.description}
                    onChange={(e) => handleChange(e)}
                    placeholder="Provide detailed description of your item"
                    disabled={localLoading}
                  />
                </label>

                <div className="widthDiv">
                  <button className="btn mintBtn" onClick={addData}>
                    {localLoading ? <Loader height="25" width="25" /> : "Mint"}
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="qrcode" style={{ display: "none" }}>
            <div ref={qrRef}>{qrcode}</div>
          </div>
        </div>
        <Success />
      </Layout>
    </div>
  );
}

export default Index;
