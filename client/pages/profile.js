import Left from "@/components/Profile/Left";
import Right from "@/components/Profile/Right";
import React, { useState } from "react";

function profile() {
  const [navItem, setNavItem] = useState(0);
  const [profile, setProfile] = useState(2);
  const nav_items = [
    ["Add Retailer", "Add Product"],
    ["Sell Product"],
    ["Pending", "Active", "Expire", "Register as a Manufacturer"],
  ];
  const profs = [
    {
      a: "M",
      b: "Manufacturer",
    },
    {
      a: "R",
      b: "Retailer",
    },
    {
      a: "C",
      b: "Customer",
    },
  ];
  return (
    <div className="main-dwar-profile-body">
      <Left
        setNavItem={setNavItem}
        navItem={navItem}
        profile={profile}
        nav_items={nav_items}
        profs={profs}
      />
      <Right navItem={navItem} nav_items={nav_items} profile={profile} />
    </div>
  );
}

export default profile;
