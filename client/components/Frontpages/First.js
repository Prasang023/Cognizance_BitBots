import React from "react";
import Lottie from "react-lottie";
import cubeJSON from "../../assets/lottie/cube.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: cubeJSON,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

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
        <Lottie options={defaultOptions} height="auto" width="80%" />
      </div>
    </div>
  );
}

export default First;
