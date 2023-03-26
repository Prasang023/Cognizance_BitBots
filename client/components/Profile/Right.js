import React from "react"
import Card from "./Card"
import Form from "./Form"
import Product from "./Forms/Product"
import Retailer from "./Forms/Retailer"

function Right({ navItem, nav_items, profile, right_items }) {
  const returnMiddle = () => {
    if (profile == 0) {
      return right_items[profile][navItem]
    } else if (profile == 1) {
      return right_items[profile][navItem]
    } else {
      // console.log("dekh bc", right_items[profile][navItem])
      return right_items[profile][navItem].map((e, index) => (
        <Card data={e} key={`card-hepu-${index}`} />
      ))
    }
  }
  return (
    <div className="dwar-profile-right">
      <div className="profile-right-box">
        <div className="top">
          <h4>{nav_items[profile][navItem]}</h4>
        </div>
        <div className={profile != 2 ? "bottom active" : "bottom"}>
          {returnMiddle()}
          {/* <Card />
          <Card />
          <Card />
          <Card /> */}
          {/* <Product/> */}
          {/* <Retailer/> */}
        </div>
      </div>
    </div>
  )
}

export default Right
