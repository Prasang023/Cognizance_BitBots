import React from "react";
import LottieCard from "../LottieCard";

function First() {
  return (
    <div className="dwar-first-page">
      <div className="left">
        <h1>
          Welcome! to<br></br> <span className="dark-blue">D</span>WAR
          <span className="dark-blue">.</span> app
        </h1>
        <p>
          It is an end-to-end decentralized warranty and supply value chain management system by using secure QR codes.
          Scan the Qr code embedded on the product before buying any premium product to check its origin of production and authenticity. Also get an easy, fast, and secure way for warranty claims and transfer.
          Seamless warranty management is not just essential for the manufacturer to prevent fraud and minimize costs, but also critical for delivering impressive customer experience.
        </p>
        <button>Explore</button>
      </div>
      <div className="right">
        <LottieCard width="80%" src="https://assets7.lottiefiles.com/packages/lf20_kndsasgl.json" />
      </div>
    </div>
  );
}

export default First;
