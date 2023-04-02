import React from "react"
import { FaRegShareSquare, FaRegHandPeace } from "react-icons/fa"
import { ConnectWallet } from "../CustomConnect"
import { clearData, registerManufacturer } from "@/redux/slices/manufacturer"
import { useDispatch, useSelector } from "react-redux"
import { checkUser } from "@/redux/navbar"
import { FaRegBell, FaRegTimesCircle } from "react-icons/fa"
import Loader from "../Loader"
import { setSuccess } from "@/redux/slices/success"

function Left({ setNavItem, navItem, profile, nav_items, profs }) {
  const dispatch = useDispatch()
  const { instances } = useSelector((state) => state.navbar)
  const { loading } = useSelector((state) => state.manufacturer)

  const addManufacturer = () => {
    dispatch(registerManufacturer())
      .unwrap()
      .then((res) => {
        dispatch(setSuccess("Successfully Added!"))
        dispatch(checkUser(instances))
      })
  }

  return (
    <>
      <div className="dwar-profile-left">
        <div className="profile-top-box">
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
                .classList.remove("active")
              setNavItem(0)
              document
                .getElementById(`profile-text-box-${0}`)
                .classList.add("active")
            }}
          >
            <div className="profile-text-item-box">
              <FaRegHandPeace size={16} className="icons" />
              <p>{nav_items[profile][0]}</p>
            </div>
          </div>
          {nav_items[profile].map((e, index) => {
            if (profile == 2 && index == 1) {
              return (
                <div
                  className="profile-text-box remove"
                  id={`profile-text-box-${index}`}
                  onClick={addManufacturer}
                >
                  <div className="profile-text-item-box">
                    {loading ? <Loader height={40} width={40} /> : <p>{e}</p>}
                  </div>
                </div>
              )
            } else if (index > 0) {
              return (
                <div
                  className="profile-text-box"
                  id={`profile-text-box-${index}`}
                  onClick={(e) => {
                    if (index == 1 && profile == 0) {
                      dispatch(clearData())
                    }
                    document
                      ?.getElementById(`profile-text-box-${navItem}`)
                      .classList.remove("active")
                    setNavItem(index)
                    document
                      .getElementById(`profile-text-box-${index}`)
                      .classList.add("active")
                  }}
                >
                  <div className="profile-text-item-box">
                    <FaRegHandPeace size={16} className="icons" />
                    <p>{e}</p>
                  </div>
                </div>
              )
            }
          })}
          <div className="profile-text-box disconnect">
            <div className="profile-text-item-box">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Left
