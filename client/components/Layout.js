import React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

// import { useSelector } from "react-redux";
// import { useAccount } from "wagmi";
// import { useRouter } from "next/router";
// import Login from "./Login";

const Layout = ({ children, hide = false }) => {
  // const { navbarMobile } = useSelector((state) => state.navbar);
  // const router = useRouter();
  // const urlpath = router.pathname;
  // const { address } = useAccount();
  console.log("hide value: ", hide)
  return (
    <div className={hide ? "dwar-container remove" : "dwar-container"}>
      <Navbar
        hide={hide}
      />
      {/* {navbarMobile ? null : (
        <>
          {address || urlpath === "/" || urlpath === "/about" ? (
          ) : (
            <Login />
          )}
        </>
      )} */}
      <div>{children}</div>
      
      <Footer hide={hide}/>
    </div>
  )
}
export default Layout
