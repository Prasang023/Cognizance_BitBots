import Product from "@/components/Profile/Forms/Product"
import Retailer from "@/components/Profile/Forms/Retailer"
import Left from "@/components/Profile/Left"
import Right from "@/components/Profile/Right"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import Navbar from "@/components/Navbar"
import Layout from "@/components/Layout"

function profile() {
  const { push } = useRouter()
  const { userRole } = useSelector((state) => state.navbar)
  if (userRole == null) {
    push("/")
  }
  const [navItem, setNavItem] = useState(0)
  const [profile, setProfile] = useState(userRole)
  useEffect(() => {
    setProfile(userRole)
  }, [userRole])

  const nav_items = [
    ["Add Retailer", "Add Product"],
    ["Sell Product"],
    ["Pending", "Active", "Expire", "Register as a Manufacturer"]
  ]
  const profs = [
    {
      a: "M",
      b: "Manufacturer"
    },
    {
      a: "R",
      b: "Retailer"
    },
    {
      a: "C",
      b: "Customer"
    }
  ]
  const right_items = [
    [<Retailer />, <Product />],
    [],
    [
      [
        {
          src: "",
          heading: "one 1",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        },
        {
          src: "",
          heading: "one 2",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        },
        {
          src: "",
          heading: "one 3",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        },
        {
          src: "",
          heading: "one 4",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        }
      ],
      [
        {
          src: "",
          heading: "two 1",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        },
        {
          src: "",
          heading: "two 2",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        },
        {
          src: "",
          heading: "two 3",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        }
      ],
      [
        {
          src: "",
          heading: "three 1",
          para: "he akjdn akjndn akjsdn akjasnd kjasnd nmasdnkjasd kjsndn ...."
        }
      ]
    ]
  ]
  return (
    <Layout hide={true}>
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
  )
}

export default profile
