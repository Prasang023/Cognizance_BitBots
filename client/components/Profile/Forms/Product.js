import Error from "@/components/Error"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../Loader"
import InputBox from "../../InputBox"
import Success from "@/components/Success"
import { Web3Storage } from "web3.storage"
import { setError } from "@/redux/slices/error"
import { setSuccess } from "@/redux/slices/success"
import { addProduct, getQR } from "@/redux/slices/manufacturer"
import { mintWarrantyNft } from "@/redux/slices/customer"

function Product() {
  const dispatch = useDispatch()
  const { walletAddress, instances } = useSelector((state) => state.navbar)
  const [addProductId, setAddProductId] = useState(null)
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    expiry: ""
  })
  const [localLoading, setLocalLoading] = useState(false)
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhhQTQzM0RkY2M4QzM5YWJFQzdmNzZDM2REQjlFOTBhMWY3RTk2RjMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkxMjcxMDk3NjMsIm5hbWUiOiJsZW5kTmZ0In0.7Zu-wSF34-7GlU5rVIXAvrIczw6MQYT4yV7vOVU9pis`
  const storage = new Web3Storage({ token: token })
  const { loading, productId, qrData } = useSelector(
    (state) => state.manufacturer
  )

  function downloadPNG() {
    // console.log("downloadPNG called")
    const linkSource = qrData
    const downloadLink = document.createElement("a")
    const fileName = "QRFile" + ".png"
    downloadLink.href = linkSource
    downloadLink.download = fileName
    console.log("PNG link: ", downloadLink)
    downloadLink.click()
  }
  useEffect(() => {
    const getTokenId = async () => {
      const t = await instances.getProductId()
      setAddProductId(parseInt(t._hex, 16))
    }
    getTokenId()
  }, [])

  // useEffect(() => {
  //   const generateQR = () => {
  //     dispatch(getQR({ qrId: productId }))
  //   }
  //   if (productId) {
  //     generateQR()
  //   }
  // }, [productId])

  const nftUpload = (e) => {
    e.preventDefault()
    setLocalLoading(true)
    const nFile = e.target.files
    console.log(nFile)
    storage
      .put(nFile)
      .then((res) => {
        console.log(res)
        setLocalLoading(false)
        setData({
          ...data,
          image: `https://ipfs.io/ipfs/${res}/${nFile[0].name}`
        })
        dispatch(setSuccess("Uploaded"))
      })
      .catch((err) => {
        setLocalLoading(false)
        dispatch(setError(err.message))
      })
    console.log(data.image)
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const handleClick = async () => {
    // const hexTokenID = await instances.getProductId()
    // const token = parseInt(hexTokenID, 16)
    // console.log(token)
    console.log("using product ID", addProductId)
    dispatch(mintWarrantyNft({ uri: "Hello world", tokenId: addProductId }))
      .unwrap()
      .then(() => {
        dispatch(
          addProduct({
            title: data.title,
            // id: tokenID,
            productImage: data.image,
            desc: data.description,
            expiryTime: data.expiry
          })
        )
        dispatch(getQR({ qrId: addProductId }))
      })
    // setLocalLoading(true)
    // console.log(`${product} merged to ${walletAddress}`);
    setData({ title: "", description: "", image: "", expiry: "" })
    // setLocalLoading(false)
  }

  return (
    <div className="dwar-form-container">
      {qrData ? (
        <div className="output-qr">
          <img src={qrData} alt="" />
          <button onClick={downloadPNG}>Download</button>
        </div>
      ) : (
        <div className="dwar-form-main">
          <div className="txt">
            <h1>Product Retailers</h1>
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
          <InputBox
            name="title"
            title="Title"
            value={data.title}
            handleChange={handleChange}
            placeholder="Item Name"
            disabled={localLoading}
          />

          <label className="inputLabel">
            <p>Description :</p>
            <textarea
              className="inputBox"
              name="description"
              value={data.description}
              onChange={(e) => handleChange(e)}
              placeholder="Provide detailed description of your item"
              disabled={localLoading}
            />
          </label>
          <InputBox
            name="expiry"
            title="Expiry"
            type="number"
            value={data.expiry}
            handleChange={handleChange}
            placeholder="Exipry Duration (in Months)."
            disabled={localLoading}
          />
          <div className="form-submit">
            <button className="form-submit-button" onClick={handleClick}>
              {localLoading || loading ? (
                <Loader height="25" width="25" />
              ) : (
                "Add"
              )}
            </button>
          </div>
        </div>
      )}
      <Success />
    </div>
  )
}

export default Product
