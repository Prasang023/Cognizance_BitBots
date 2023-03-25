import Layout from "@/components/Layout"
import ProductBoardGlobal from "@/components/ProductBoardGlobal"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetailsById } from "@/redux/slices/retailer"

function Product() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [details, setDetails] = useState()
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
  const { id } = router.query
  const { instances } = useSelector((state) => state.navbar)

  console.log(details)
  return (
    <Layout>
      <div className="dwar-product-main">
        {instances ? (
          <ProductBoardGlobal scannedData={id} />
        ) : (
          <h2>Please Connect your wallet</h2>
        )}
        {/* <ProductBoardGlobal scannedData={id} /> */}
      </div>
    </Layout>
  )
}

export default Product
