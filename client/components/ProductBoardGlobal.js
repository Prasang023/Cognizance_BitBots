import React, { useState, useEffect } from "react"
import * as Push from "@pushprotocol/restapi"
import { useDispatch, useSelector } from "react-redux"
import Router from "next/router"
// import Success from "@/components/Success";
// import Error from "@/components/Error";
import { useSigner } from "wagmi"
import { setSuccess } from "@/redux/slices/success"
import { setError } from "@/redux/slices/error"
import InputBox from "./InputBox"
import { getProductDetailsById, sellProduct } from "@/redux/slices/retailer"
import Image from "next/image"
import logo from "../assets/logo/dwar.png"
import { resellProduct, transferNft } from "@/redux/slices/customer"

const statusArray = [
  "Not_Dispatched",
  "Shipped",
  "Warranty Active",
  "Warranty Expired"
]

function ProductBoardGlobal({ scannedData }) {
  console.log("scanned Data: ", scannedData)
  const dispatch = useDispatch()
  const { userRole, instances } = useSelector((state) => state.navbar)
  const [localLoading, setLocalLoading] = useState(null)
  const [data, setData] = useState({
    recipient_address: ""
  })

  if (userRole == 1) Router.push(`/profile`)

  useEffect(() => {
    const func = async () => {
      dispatch(getProductDetailsById(scannedData))
    }
    if (scannedData && instances) func()
  }, [scannedData, instances])

  // useEffect(() => {
  //   dispatch(getProductDetailsById(scannedData))
  // }, [])
  // const PK = process.env.CHANNEL_KEY
  // const Pkey = `0x${PK}`
  // const channelAddress = "0x7eff959E7D7fB6b9F3cDA78599966870929A7628"

  // const { data: signer } = useSigner(Pkey)

  const { productDetail } = useSelector((state) => state.retailer)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }
  // console.log("product details in component:", productDetail)

  const handleClick = async () => {
    if (data.recipient_address.length == 0) return
    try {
      dispatch(transferNft({ id: scannedData, add: data.recipient_address }))
        .unwrap()
        .then(() => {
          dispatch(
            resellProduct({ id: scannedData, to: data.recipient_address })
          )
          dispatch(setSuccess("Product ownership and NFT Transferred"))
        })
      // dispatch(sellProduct({ id: scannedData, add: data.recipient_address }))
      //   .unwrap()
      //   .then(() => {
      //     dispatch(setSuccess("Product sold Successfully!"));
      //   });

      // await Push.payloads.sendNotification({
      //   signer,
      //   type: 3, //target
      //   identityType: 2, //direct payloads
      //   notification: {
      //     title: "New Notification Alert",
      //     body: "Message!",
      //   },
      //   payload: {
      //     title: `Pending Notification 📌`,
      //     body: `You have an activation request for ${scannedData}`, //tokenID
      //     cta: "",
      //     img: "",
      //   },
      //   recipients: data.recipient_address,
      //   channel: channelAddress,
      //   env: "staging",
      // });
      setData({ recipient_address: "" })
    } catch (error) {
      setData({ recipient_address: "" })
      dispatch(setError("Check your inputs", error.message))
    }
  }
  return (
    <div className="product-detail-box">
      <div className="photo">
        <Image
          src={productDetail ? productDetail[2] : logo}
          width={100}
          height={100}
          alt="Product Img"
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
      {productDetail && productDetail[9] == 0 ? (
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
            <p>Transfer Ownership</p>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ProductBoardGlobal
