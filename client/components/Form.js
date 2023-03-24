import { ethers } from "ethers";
import React, { useState } from "react";
import Error from "@/components/Error";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import Success from "@/components/Success";
import InputBox from "@/components/InputBox";

const project_id = "2LaElUcAr2SYK3KuPpor7Xlc5hB";
const project_secret = "0947f1f7854b4631c685a30c20e51d4d";

function Form() {


  return (
    <div className="start-form">
      <div className="main-form-body">
        <div className="box">
          <span className="borderLine"></span>
          <form>

            <div className="txt">
              <h1 style={{ margin: "10px 0px" }}>Transfer Details</h1>
            </div>

            <div className="inputBox">
              <input type="text" required="required" />
              <span> BOL Kya Chiye </span>
              <i></i>
            </div>


            <div className="inputBox">
              <input type="text" required="required" />
              <span> BOL Kya Chiye </span>
              <i></i>
            </div>

            <div className="inputBox">
              <input type="text" required="required" />
              <span> BOL Kya Chiye </span>
              <i></i>
            </div>

            <input type="submit" />

            {/* <InputBox
            name="toAddress"
            title="Transfer to Address"
            //   value={data.toAddress}
            //   handleChange={handleChange}
            placeholder="Enter Transfer Address"
          //   disabled={localLoading}
          />

          <InputBox
            name="tokenId"
            title="NFT Token ID"
            //   value={data.tokenId}
            //   handleChange={handleChange}
            placeholder="Enter NFT Token ID"
          //   disabled={localLoading}
          /> */}

            <div className="widthDiv">
              <button className="btn mintBtn" >
              </button>
            </div>
          </form>
        </div>
      </div >
    </div>
  );
}

export default Form;