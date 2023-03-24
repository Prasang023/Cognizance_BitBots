import React from "react";
import Card from "./Card";

function Right({ navItem, nav_items, profile }) {
  return (
    <div className="dwar-profile-right">
      <div className="profile-right-box">
        <div className="top">
          <h4>{nav_items[profile][navItem]}</h4>
        </div>
        <div className="bottom">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default Right;
