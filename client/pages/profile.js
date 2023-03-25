import Product from "@/components/Profile/Forms/Product";
import Retailer from "@/components/Profile/Forms/Retailer";
import Left from "@/components/Profile/Left";
import Right from "@/components/Profile/Right";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Scan from "@/components/Scan";
import { ImCross } from "react-icons/im";
import { useAccount } from "wagmi";
import { getProducts } from "@/redux/slices/customer";
import Model from "@/components/Profile/Model";

function profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { address } = useAccount();

  const { userRole } = useSelector((state) => state.navbar);
  const { allProducts } = useSelector((state) => state.customer);
  useEffect(() => {
    if (userRole == null || userRole == undefined) {
      document.getElementById("demo-btn").click();
    }
  }, []);
  const [navItem, setNavItem] = useState(0);
  const [profile, setProfile] = useState(
    userRole == null || userRole == undefined ? 2 : userRole
  );
  useEffect(() => {
    setProfile(userRole);
  }, [userRole]);

  useEffect(() => {
    if (userRole == null || userRole == undefined) {
      setProfile(2);
    }
  }, [profile]);

  const pendingProducts = allProducts.filter(
    (p) => p[8] == address && p[9] == 1
  );
  const activeProducts = allProducts.filter(
    (p) => p[8] == address && p[9] == 2
  );
  const expiredProducts = allProducts.filter(
    (p) => p[8] == address && p[9] == 3
  );

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

  useEffect(() => {
    dispatch(getProducts());
  }, [address]);

  const right_items = [
    [<Retailer />, <Product />],
    [<Scan />],
    [pendingProducts, activeProducts, expiredProducts],
  ];
  return (
    <>
      <Layout hide={true}>
        <Model />
        <button
          id="demo-btn"
          onClick={(e) => {
            router.push("/");
          }}
          style={{ visibility: "hidden" }}
        >
          Remove
        </button>
        <div className="main-dwar-profile-body">
          <Left
            setNavItem={setNavItem}
            navItem={navItem}
            profile={profile}
            nav_items={nav_items}
            profs={profs}
          />
          <Right
            navItem={navItem}
            nav_items={nav_items}
            profile={profile}
            right_items={right_items}
          />
        </div>
      </Layout>
    </>
  );
}

export default profile;
