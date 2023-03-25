import React from "react";

function ProductBoard({ scannedData }) {
  return (
    <div className="product-detail-box">
      <div className="photo"></div>
      <div className="box">
        <p>Name</p>
        <div className="child">
          <p>Title</p>
        </div>
      </div>
      <div className="box">
        <p>Activate time</p>
        <div className="child">
          <p>1-2-2002</p>
        </div>
      </div>
      <div className="box">
        <p>Product status</p>
        <div className="child">
          <p>Ma chudae</p>
        </div>
      </div>
      <div className="box button">
        <p>Sell Product</p>
      </div>
    </div>
  );
}

export default ProductBoard;
