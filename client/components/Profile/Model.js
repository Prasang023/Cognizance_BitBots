import React from "react";
import { FaRegBell, FaRegTimesCircle } from "react-icons/fa";

function Model() {
  return (
    <div className="dwar-model" id="dwar-model">
      <div className="box">
        <div className="dwar-model-box-close">
          <FaRegTimesCircle
            size={20}
            className="icons"
            onClick={() => {
              const ele = document.getElementById("dwar-model");
              ele.style.opacity = 0;
              ele.style.zIndex = -1000;
            }}
          />
        </div>
        <div className="items">
          <p>Enter Address</p>
          <input type="text" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Model;
