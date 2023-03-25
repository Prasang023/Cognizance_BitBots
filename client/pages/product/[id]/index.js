import Layout from "@/components/Layout";
import ProductBoardGlobal from "@/components/ProductBoardGlobal";
import { useRouter } from "next/router";
import React from "react";

function Product() {
  const router = useRouter();
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
  const { id } = router.query;
  console.log(id);
  return (
    <Layout>
      <div className="dwar-product-main">
        <ProductBoardGlobal scannedData={id} />
      </div>
    </Layout>
  );
}

export default Product;
