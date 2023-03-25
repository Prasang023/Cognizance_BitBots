import Link from "next/link"
import Image from "next/image"
import { ethers } from "ethers"
import React, { useState, useEffect } from "react"
import { useAccount, useSigner } from "wagmi"
import { useDispatch, useSelector } from "react-redux"
import warrantyAbi from "../assets/contract_data/warranty.json"
import warranty_contract_address from "../assets/contract_data/warrantyAddress.json"
import {
  addContractAddresses,
  checkUser,
  saveAddressAndSigner,
  clearNavbar
} from "@/redux/navbar"
import { ConnectWallet } from "./CustomConnect"
import * as Push from "@pushprotocol/restapi"

// icons
import { FaRegBell, FaRegTimesCircle } from "react-icons/fa"

// image
import logo from "../assets/logo/dwar.svg"

function Navbar({hide}) {
  const dispatch = useDispatch()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  if(!address) {
    dispatch(clearNavbar());
  }
  // console.log("account:", account)

  const [notification, setNotification] = useState(null)
  // const { userRole } = useSelector((state) => state.navbar);

  useEffect(() => {
    const notification = async () => {
      const notifs = await Push.user.getFeeds({
        user: address,
        env: "staging",
        limit: 5,
        page: 1
      })
      setNotification(notifs)
    }
    !address ? setNotification(null) : notification()
  }, [address])

  const instances = new ethers.Contract(
    warranty_contract_address.address,
    warrantyAbi.abi,
    signer
  )

  useEffect(() => {
    dispatch(
      addContractAddresses({
        warranty_contract_address: warranty_contract_address.address
      })
    )
    address && signer
      ? dispatch(
          saveAddressAndSigner({
            address,
            signer,
            instances
          })
        )
      : null
    const findUser = async () => {
      const res = await instances?.checkUser()
      console.log(res)
    }
    // findUser()
    instances ? dispatch(checkUser(instances)) : null
    // await instances?.checkUser()
  }, [signer, dispatch])

  return (
    <>
      <div className="dwar-notification-container" id="dwar-notification">
        <div className="dwar-notification-box">
          <div className="dwar-notification-box-close">
            <p>Notifications</p>
            <FaRegTimesCircle
              size={20}
              className="icons"
              onClick={() => {
                const ele = document.getElementById("dwar-notification")
                ele.style.opacity = 0
                ele.style.zIndex = -1000
              }}
            />
          </div>
          <div className="dwar-notification-box-list">
            {notification ? (
              notification?.map((notifs, index) => {
                return (
                  <div
                    className="dwar-notification-box-list-item"
                    key={`dwar-notification-box-list-item-${index}`}
                  >
                    {notifs.title}: {notifs.message}
                  </div>
                )
              })
            ) : (
              <div style={{ color: "black" }}>Please Connect to Wallet</div>
            )}
          </div>
        </div>
      </div>
      <div className="dwar-navbar-container" style={hide ? { visibility: "hidden" } : { visibility: "visible" }}>
        <div className="dwar-logo-container">
          <Link href="/">
            <Image
              alt=""
              src={logo}
              width={95}
              height={95}
              style={{ borderRadius: "100%" }}
            />
          </Link>
        </div>
        <div className="dwar-element-container">
          <div className="dwar-list-container">
            <Link href="/">Home</Link>
            <Link href="/">Documents</Link>
            <Link href="/">About</Link>
            <Link href="/">Help & Support</Link>
          </div>
          <div className="dwar-btn-container">
            <ConnectWallet />
            <div
              className="dwar-notification"
              onClick={() => {
                const ele = document.getElementById("dwar-notification")
                ele.style.opacity = 1
                ele.style.zIndex = 1000
              }}
            >
              <FaRegBell size={16} className="icons" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
