import React from "react";
import LottieCard from "../LottieCard";

function Second() {
  return (
    <div className="dwar-second-page">
      <div className="left">
        <h1>
          What we do<span className="dark-blue">?</span>
        </h1>
        <p>
          We make multiparty transaction frictionless and cost-efficient which can be especially beneficial for manufacturing ecosystem consisting of multiple parties interacting with each other at every stop and transation.
          <br></br>
          <br></br>
          we keep track of purchase orders, receipts, or other warranty documents to follow the whole warranty value chain and give the consumer and manufacturer additional transparency. Due to which gaps in knowledge between manufacturers, distributors, warranty providers, and customers are minimised.
          <br></br>
          <br></br>
          By decentralising the entire ecosystem, we increase product transparency and resolve disputes amongst suppliers over the authenticity of the items while collaborating with them.
          <br></br>

        </p>
        <button>Need Help ?</button>
      </div>
      <div className="right">
        <LottieCard width="90%" src="https://assets7.lottiefiles.com/packages/lf20_9xrenieu.json" />
      </div>
    </div>
  );
}

export default Second;
