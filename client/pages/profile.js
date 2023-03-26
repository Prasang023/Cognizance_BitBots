import Product from "@/components/Profile/Forms/Product"
import Retailer from "@/components/Profile/Forms/Retailer"
import Left from "@/components/Profile/Left"
import Right from "@/components/Profile/Right"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
// import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout"
import Scan from "@/components/Scan"
import { ImCross } from "react-icons/im"
import { useAccount } from "wagmi"
import { getProducts } from "@/redux/slices/customer"
import Model from "@/components/Profile/Model"

function profile() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { address } = useAccount()

  const { userRole } = useSelector((state) => state.navbar)
  const { allProducts } = useSelector((state) => state.customer)
  useEffect(() => {
    if (userRole == null || userRole == undefined) {
      document.getElementById("demo-btn").click()
    }
  }, [])
  const [navItem, setNavItem] = useState(0)
  const [profile, setProfile] = useState(
    userRole == null || userRole == undefined ? 2 : userRole
  )
  useEffect(() => {
    setProfile(userRole)
  }, [userRole])

  useEffect(() => {
    if (userRole == null || userRole == undefined) {
      setProfile(2)
    }
  }, [profile])

  const productWarranties = allProducts.filter(
    (p) => p[11] == address && p[9] > 1
  )

  const nav_items = [
    ["Add Retailer", "Add Product"],
    ["Sell Product"],
    ["My Products", "Register as a Manufacturer"]
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

  useEffect(() => {
    dispatch(getProducts())
  }, [address])

  useEffect(() => {
    const coords = { x: 0, y: 0 }
    const circles = document.querySelectorAll(".cursor-circle")

    const colors = [
      "#0f3fc4",
      "#1753f7",
      "#2b4f79",
      "#394992",
      "#465997",
      "#325c6d",
      "#3776ff",
      "#3a78ff",
      "#3a63bd",
      "#6594bb",
      "#5d8aec",
      "#5c8be3",
      "#6f8ebd",
      "#6b90a8",
      "#8cbada",
      "#61bff5",
      "#5ea9ef",
      "#6bfff8",
      "#69e7fd",
      "#63cef8",
      "#3bd8ff",
      "#ecececc0"
    ]

    circles.forEach(function (circle, index) {
      circle.x = 0
      circle.y = 0
      circle.style.backgroundColor = colors[index % colors.length]
    })

    window.addEventListener("mousemove", function (e) {
      coords.x = e.clientX
      coords.y = e.clientY
    })

    function animateCircles() {
      let x = coords.x
      let y = coords.y

      circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px"
        circle.style.top = y - 12 + "px"

        circle.style.scale = (circles.length - index) / circles.length

        circle.x = x
        circle.y = y

        const nextCircle = circles[index + 1] || circles[0]
        x += (nextCircle.x - x) * 0.5
        y += (nextCircle.y - y) * 0.5
      })

      requestAnimationFrame(animateCircles)
    }

    animateCircles()
  }, [])
  // console.log("pw", productWarranties)
  const right_items = [
    [<Retailer />, <Product />],
    [<Scan />],
    [productWarranties]
  ]
  return (
    <Layout hide={true}>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>
      <div class="cursor-circle "></div>

      <button
        id="demo-btn"
        onClick={(e) => {
          router.push("/")
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
  )
}

export default profile
