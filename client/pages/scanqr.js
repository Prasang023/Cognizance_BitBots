import Layout from "@/components/Layout"
import React, { useRef, useState } from "react"
import dynamic from "next/dynamic"
import InputBox from "@/components/InputBox"
import Router from "next/router"
import { useDispatch, useSelector } from "react-redux"
const QrReader = dynamic(() => import(`react-weblineindia-qrcode-scanner`), {
  ssr: false
})

function scanqr() {
  const videoRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [scannedData, setScannedData] = useState(null)
  const [tokenID, setTokenID] = useState("")
  const { userRole } = useSelector((state) => state.navbar)
  if (userRole == 1) Router.push(`/profile`)

  const handleLoad = () => {
    setIsReady(true)
  }

  const [data, setData] = useState({
    tokenID: ""
  })

  const handleDetected = (data) => {
    // setScannedData(data)
    // console.log(`Scanned Data: ${data}`)
    if (videoRef.current && isReady) {
      videoRef.current.play().catch((error) => {
        console.error("Error starting scanner:", error)
      })
    }
    videoRef.current &&
      videoRef.current.video &&
      console.log(`Video width: ${videoRef.current.video.videoWidth}`)
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const handleClick = (e) => {
    setScannedData(data.tokenID)
    Router.push(`/product/${data.tokenID}`)
  }

  return (
    <Layout>
      <div className="dwar-scan-main">
        <div className="QrScanner">
          <QrReader
            // style={previewStyle}
            onScan={handleDetected}
            onLoad={handleLoad}
            onError={(e) => {
              console.error(e.message)
            }}
          />
        </div>
        <div className="input-container" style={{ textAlign: "center" }}>
          <InputBox
            type="number"
            name="tokenID"
            title="Token ID"
            value={data.tokenID}
            handleChange={handleChange}
            placeholder="Enter Token ID"
          />
          <button className="" onClick={handleClick}>
            Get Product
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default scanqr
