import React from "react";
import Lottie from "react-lottie";
import helloJSON from "../../assets/lottie/hello.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: helloJSON,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Second() {
  return (
    <div className="dwar-second-page">
      <div className="left">
        <h1>
          What we do<span className="dark-blue">?</span>
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          eaque nihil doloremque corporis asperiores molestiae inventore optiol
          doloremque corporis asperiores molestiae inventore optioonsectetur
          adipisicing elit. Recusandae eaque nihil doloremque corporis
          asperiores molestiae inventore optiol
          <br></br>
          <br></br>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          eaque nihil doloremque corporis asperiores molestiae inventore optiol
          doloremque corporis asperiores molestiae inventore optioonsectetur
          asperiores molestiae inventore optiol
          <br></br>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          eaquee inventore optioonsectetur
          asperiores molestiae inventore optiol
          <br></br>
          <br></br>
          eaque nihil doloremque corporis asperiores molestiae inventore optiol
          doloremque corporis asperiores molestiae inventore optioonsectetur
          asperiores molestiae inventore optiol
        </p>
        <button>Need Help ?</button>
      </div>
      <div className="right">
        <Lottie options={defaultOptions} height="auto" width="90%" />
      </div>
    </div>
  );
}

export default Second;
