import React, { useState, useEffect, use } from "react"
import * as Push from "@pushprotocol/restapi"
import { useDispatch, useSelector } from "react-redux"
// import Success from "@/components/Success";
// import Error from "@/components/Error";
import { useAccount, useSigner } from "wagmi"
import { setSuccess } from "@/redux/slices/success"
import { setError } from "@/redux/slices/error"
import InputBox from "./InputBox"
import { getProductDetailsById, sellProduct } from "@/redux/slices/retailer"
import Image from "next/image"
import logo from "../assets/logo/dwar.png"
import { transferNft } from "@/redux/slices/customer"

const statusArray = [
  "Not_Dispatched",
  "Shipped",
  "Warranty Active",
  "Warranty Expired"
]

function ProductBoard({ scannedData }) {
  console.log("scanned Data: ", scannedData)
  const dispatch = useDispatch()
  const [localLoading, setLocalLoading] = useState(null)
  const [data, setData] = useState({
    recipient_address: ""
  })

  const { address } = useAccount()
  const PK = process.env.CHANNEL_KEY
  const Pkey = `0x${PK}`
  const channelAddress = "0x7eff959E7D7fB6b9F3cDA78599966870929A7628"

  const { data: signer } = useSigner(Pkey)
  const { productDetail } = useSelector((state) => state.retailer)

  useEffect(() => {
    dispatch(getProductDetailsById(scannedData))
  }, [scannedData])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }
  // console.log("product details in component:", productDetail)

  const handleClick = async () => {
    try {
      dispatch(transferNft({ id: scannedData, add: data.recipient_address }))
        .unwrap()
        .then(() => {
          dispatch(
            sellProduct({ id: scannedData, add: data.recipient_address })
          )
            .unwrap()
            .then(() => {
              dispatch(setSuccess("Product sold Successfully!"))
            })
        })

      // await Push.payloads.sendNotification({
      //   signer,
      //   type: 3, //target
      //   identityType: 2, //direct payloads
      //   notification: {
      //     title: "New Notification Alert",
      //     body: "Message!"
      //   },
      //   payload: {
      //     title: `Pending Notification 📌`,
      //     body: `You have an activation request for ${scannedData}`, //tokenID
      //     cta: "",
      //     img: ""
      //   },
      //   recipients: data.recipient_address,
      //   channel: channelAddress,
      //   env: "staging"
      // })
      // dispatch(setSuccess("Notification Sent"))
      setData({ recipient_address: "" })
    } catch (error) {
      setData({ recipient_address: "" })
      dispatch(setError("Unable to notify !", error.message))
    }
  }
  return (
    <div className="product-detail-box">
      <div className="photo">
        <Image
          src={productDetail ? productDetail[2] : logo}
          width={100}
          height={100}
        />
      </div>
      <div className="box">
        <p>Title</p>
        <div className="child">
          <p>{productDetail ? productDetail[0] : "Title"}</p>
        </div>
      </div>
      <div className="box">
        <p>Description/Terms and Conditions</p>
        <div className="child">
          <p>{productDetail ? productDetail[3] : "Lorem ipsum"}</p>
        </div>
      </div>
      <div className="box">
        <p>Manufacturer</p>
        <div className="child">
          <p>{productDetail ? productDetail[6] : "Lorem ipsum"}</p>
        </div>
      </div>
      <div className="box">
        <p>Product status</p>
        <div className="child">
          <p>{productDetail ? statusArray[productDetail[9]] : "Lorem ipsum"}</p>
        </div>
      </div>
      {productDetail && productDetail[9] == 0 && productDetail[11] == address ? (
        <>
          <div className="box">
            <InputBox
              name="recipient_address"
              title="Enter the Recipient Address"
              value={data.recipient_address}
              handleChange={handleChange}
              placeholder="Recipient 0x...."
              disabled={localLoading}
            />
          </div>
          <div className="box button" onClick={handleClick}>
            <p>Sell Product</p>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ProductBoard
