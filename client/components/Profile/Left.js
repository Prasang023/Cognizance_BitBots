import React from "react";
import { FaRegShareSquare, FaRegHandPeace } from "react-icons/fa";

function Left({ setNavItem, navItem, profile, nav_items, profs }) {
  return (
    <div className="dwar-profile-left">
      <div className="profile-top-box">
        <div className="profile-top-box-round">
          <h1>{profs[profile].a}</h1>
        </div>
        <div className="profile-top-box-text">
          <p>{profs[profile].b}</p>
        </div>
      </div>
      <div className="profile-bottom-box">
        <div
          className="profile-text-box active"
          id={`profile-text-box-${0}`}
          onClick={(e) => {
            document
              .getElementById(`profile-text-box-${navItem}`)
              .classList.remove("active");
            setNavItem(0);
            document
              .getElementById(`profile-text-box-${0}`)
              .classList.add("active");
          }}
        >
          <div className="profile-text-item-box">
            <FaRegHandPeace size={16} className="icons" />
            <p>{nav_items[profile][0]}</p>
          </div>
        </div>
        {nav_items[profile].map((e, index) => {
          if (index > 0) {
            return (
              <div
                className="profile-text-box"
                id={`profile-text-box-${index}`}
                onClick={(e) => {
                  document
                    .getElementById(`profile-text-box-${navItem}`)
                    .classList.remove("active");
                  setNavItem(index);
                  document
                    .getElementById(`profile-text-box-${index}`)
                    .classList.add("active");
                }}
              >
                <div className="profile-text-item-box">
                  <FaRegHandPeace size={16} className="icons" />
                  <p>{e}</p>
                </div>
              </div>
            );
          }
        })}
        <div className="profile-text-box disconnect">
          <div className="profile-text-item-box">
            <FaRegShareSquare size={16} className="icons" />
            <p>Disconnect</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Left;