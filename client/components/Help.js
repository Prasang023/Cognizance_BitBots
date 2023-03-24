import React from "react";
import LottieCard from "./LottieCard";

function Help() {
  return (
    <div className="help-container">
      {/* <div className="header">
        <h2>Help & Support</h2>
      </div> */}
      <div className="main-container">
        <div className="help-list-container">
          <div className="help">
            <li>Customer Care</li>
            <li>About</li>
            <li></li>
            <li></li>
          </div>
          <div className="support">
            <li>Contact Us</li>
            <li>Settings</li>
            <li>Profile</li>
          </div>
        </div>
        <div className="help-lottie-container">
          <div style={{ width: "400px" }}>
            <LottieCard
              src="https://assets2.lottiefiles.com/packages/lf20_agpu4w06.json"
              width={"500px"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
