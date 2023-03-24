import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import First from "./Frontpages/First";
import Second from "./Frontpages/Second";
import Form from "./Form";
// import { useSelector } from "react-redux";
// import { useAccount } from "wagmi";
// import { useRouter } from "next/router";
// import Login from "./Login";

const Layout = ({ children }) => {
  // const { navbarMobile } = useSelector((state) => state.navbar);
  // const router = useRouter();
  // const urlpath = router.pathname;
  // const { address } = useAccount();
  return (
    <div className="dwar-container">
      <Navbar />
      <First/>
      <Second/>
      <Footer/>
      <Form />
      
      {/* {navbarMobile ? null : (
        <>
          {address || urlpath === "/" || urlpath === "/about" ? (
          ) : (
            <Login />
          )}
        </>
      )} */}
      {/* <div>{children}</div> */}
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
