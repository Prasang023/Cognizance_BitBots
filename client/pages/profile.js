import Product from "@/components/Profile/Forms/Product";
import Retailer from "@/components/Profile/Forms/Retailer";
import Left from "@/components/Profile/Left";
import Right from "@/components/Profile/Right";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Scan from "@/components/Scan";
import { ImCross } from "react-icons/im";
import { useAccount } from "wagmi";
import { getProducts } from "@/redux/slices/customer";

function profile() {
  const router = useRouter();
  const { address } = useAccount();

  const { instances } = useSelector((state) => state.navbar);

  const { userRole } = useSelector((state) => state.navbar);
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
    const fetchAllProduct = async () => {
      const product = await instances?.getProducts();
      console.log(`Product:`, product);
    };
    fetchAllProduct();
  }, [address]);

  const right_items = [
    [<Retailer />, <Product />],
    [<Scan />],
    [
      [
        {
          src: "",
          heading: "one 1",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
        {
          src: "",
          heading: "one 2",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
        {
          src: "",
          heading: "one 3",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
        {
          src: "",
          heading: "one 4",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
      ],
      [
        {
          src: "",
          heading: "two 1",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
        {
          src: "",
          heading: "two 2",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
        {
          src: "",
          heading: "two 3",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
      ],
      [
        {
          src: "",
          heading: "three 1",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ....",
        },
      ],
    ],
  ];
  return (
    <Layout hide={true}>
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
  );
}

export default profile;
