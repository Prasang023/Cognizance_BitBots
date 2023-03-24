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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          eaque nihil doloremque corporis asperiores molestiae inventore optiol
          doloremque corporis asperiores molestiae inventore optioonsectetur
          adipisicing elit. Recusandae eaque nihil doloremque corporis
          asperiores molestiae inventore optiol
        </p>
        <button>Explore</button>
      </div>
      <div className="right">
        <LottieCard width="80%" src="https://assets7.lottiefiles.com/packages/lf20_kndsasgl.json"/>
      </div>
    </div>
  );
}

export default First;
