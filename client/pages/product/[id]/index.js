import Layout from "@/components/Layout"
import ProductBoardGlobal from "@/components/ProductBoardGlobal"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductDetailsById } from "@/redux/slices/retailer"

function Product() {
  const dispatch = useDispatch()
  const router = useRouter()
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
  const { id } = router.query
  useEffect(() => {
    if (id) dispatch(getProductDetailsById(id))
  }, [id])
  console.log(id)
  return (
    <Layout>
      <div className="dwar-product-main">
        <ProductBoardGlobal scannedData={id} />
      </div>
    </Layout>
  )
}

export default Product
